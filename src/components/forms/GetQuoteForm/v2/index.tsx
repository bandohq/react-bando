// import Grid from '@mui/material/Unstable_Grid2';
import BoxContainer from '@components/BoxContainer';
// import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import { useCallback, useRef, useEffect, ChangeEvent, useState } from 'react';
import debounce from 'lodash/debounce';

import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaV2, GetQuoteFormValuesV2 } from '../schema';

// import BandoButton from '@components/Button';
// import Input from '@components/forms/Input';
// import Select from '@components/forms/Select';
// import Hr from '@components/Hr';

// import Polygon from '../../../../assets/polygon.png';
// import Ethereum from '../../../../assets/ethereum.png';
import TokensWidget from '@components/TokensWidget';

import useQuote from '@hooks/useQuote';
import useUser from '@hooks/useUser';
import useTokens from '@hooks/useTokens';
import useNetworks from '@hooks/useNetworks';
import formatNumber from '@helpers/formatNumber';
import { CircularProgress } from '@mui/material';

// import { sendCurrency, depositCurrency } from '@config/constants/currencies';
import { Quote } from '@hooks/useQuote/requests';
import env from '@config/env';
// import formatNumber from '@helpers/formatNumber';

const REQUEST_DEBOUNCE = 250;
const HAS_ONLY_CURRENCY = true;
const DEFAULT_CURRENCY = 'MXN';

export const CurrencyImg = styled('img')(({ theme }) => ({
  marginTop: '-10px',
  marginBottom: '-10px',
  padding: 0,
  marginRight: theme.spacing(1),
  width: 37,
  height: 37,
}));

export default function GetQuoteFormV2() {
  const navigate = useNavigate();
  const { isMutating, data, getQuote } = useQuote();
  const [formError, setFormError] = useState<string>('');

  const { user } = useUser();
  const methods = useForm<GetQuoteFormValuesV2>({
    resolver: yupResolver(schemaV2),
    defaultValues: {
      baseCurrency: DEFAULT_CURRENCY,
      operationType: 'deposit',
    },
  });

  const { handleSubmit } = methods;

  const operationType = methods.watch('operationType');
  const baseCurrency = methods.watch('baseCurrency');
  const quoteCurrency = methods.watch('quoteCurrency');

  const rateText =
    operationType === 'deposit'
      ? `1 ${quoteCurrency} ≈ $${formatNumber(data?.quoteRateInverse) ?? 0} ${baseCurrency}`
      : `1 ${baseCurrency} ≈ $${formatNumber(data?.quoteRate) ?? 0} ${quoteCurrency}`;

  const navigateForm = useCallback(
    (quote?: Quote) => {
      const formValues = methods.getValues();
      localStorage.setItem(
        env.rampDataLocalStorage,
        JSON.stringify({
          quote: quote ?? data,
          network: formValues.network,
          operationType: formValues.operationType,
        }),
      );

      if (!user?.email && !user?.id) return navigate('/signin');
      if (!user?.kycLevel) return navigate('/kyc');
      return navigate('/ramp');
    },
    [data, methods, navigate, user],
  );

  const onSubmit = useCallback(
    async (formValues: GetQuoteFormValuesV2) => {
      console.log('onSubmit');
      if (data?.quoteAmount) return navigateForm();
      setFormError('');
      try {
        const quote = await getQuote({
          baseAmount: formValues.baseAmount,
          baseCurrency: formValues.baseCurrency,
          quoteCurrency: formValues.quoteCurrency,
          network: formValues.network,
        });

        navigateForm(quote);
      } catch {
        setFormError('Ha ocurrido un error.');
      }
    },
    [getQuote, data, navigateForm],
  );

  const debouncedRequest = useCallback(
    (formValues: GetQuoteFormValuesV2) => {
      console.log('debouncedRequest');
      setFormError('');
      return getQuote({
        baseAmount: formValues.baseAmount,
        baseCurrency: formValues.baseCurrency,
        quoteCurrency: formValues.quoteCurrency,
        network: formValues.network,
      }).catch(() => {
        setFormError('Ha ocurrido un error.');
        return null;
      });
    },
    [getQuote],
  );

  const debouncedQuoteRequest = useRef(
    debounce(methods.handleSubmit(debouncedRequest), REQUEST_DEBOUNCE, { leading: true }),
  );

  return (
    <BoxContainer
      sx={{ width: '100%', maxWidth: '600px', overflow: 'hidden', position: 'relative' }}
    >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <TokensWidget
            onlyOneCurrency={HAS_ONLY_CURRENCY}
            defaultCurrency={DEFAULT_CURRENCY}
            onQuantityChange={() => debouncedQuoteRequest.current()}
            onSubmit={() => handleSubmit(onSubmit)()}
            formError={formError}
            rateText={
              isMutating ? (
                <CircularProgress
                  size={15}
                  sx={{ marginLeft: 1, color: 'palette.ink.i500' }}
                  aria-label="submitting"
                />
              ) : (
                rateText
              )
            }
            quote={data}
          />
        </form>
      </FormProvider>
    </BoxContainer>
  );
}
