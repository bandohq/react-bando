import BoxContainer from '@components/BoxContainer';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

import { styled } from '@mui/material/styles';
import { useCallback, useRef, useState } from 'react';
import debounce from 'lodash/debounce';

import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaV2, GetQuoteFormValuesV2 } from '../schema';

import TokensWidget from '@components/TokensWidget';

import useQuote from '@hooks/useQuote';
import useUser from '@hooks/useUser';
import formatNumber from '@helpers/formatNumber';
import { CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Quote } from '@hooks/useQuote/requests';
import env from '@config/env';

const REQUEST_DEBOUNCE = 250;
const HAS_ONLY_CURRENCY = true;
const DEFAULT_CURRENCY = 'MXN';
const DEFAULT_OPERATION = 'deposit';
const MIN_DEFAULT_AMOUNTS: { [key: string]: number } = {
  MXN: 100,
  USDC: 5,
  USDT: 5,
  ETH: 0.0001,
};

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
  const { t } = useTranslation('form');
  const { isMutating, quote: data, getQuote, resetQuote } = useQuote();
  const [formError, setFormError] = useState<string>('');
  const [notFoundMessage, setNotFoundMessage] = useState<boolean>(false);

  const { user } = useUser();
  const methods = useForm<GetQuoteFormValuesV2>({
    resolver: yupResolver(schemaV2(t)),
    defaultValues: {
      baseCurrency: DEFAULT_CURRENCY,
      operationType: DEFAULT_OPERATION,
    },
  });

  const operationType = methods.watch('operationType');
  const baseCurrency = methods.watch('baseCurrency');
  const quoteCurrency = methods.watch('quoteCurrency');

  const rateText = !quoteCurrency
    ? '-'
    : operationType === 'deposit'
      ? `1 ${quoteCurrency} ≈ ${formatNumber(data?.quoteRateInverse) ?? 0} ${baseCurrency}`
      : `1 ${baseCurrency} ≈ ${formatNumber(data?.quoteRate) ?? 0} ${quoteCurrency}`;

  const navigateForm = useCallback(
    (quote?: Quote) => {
      const formValues = methods.getValues();
      localStorage.setItem(
        env.rampDataLocalStorage,
        JSON.stringify({
          quote: quote ?? data,
          networkObj: formValues.networkObj,
          tokenObj: formValues.tokenObj,
          operationType: formValues.operationType,
        }),
      );

      if (!user?.email && !user?.id) return navigate('/signin');
      if (!user?.kycLevel) return navigate('/start');
      return navigate('/ramp');
    },
    [data, methods, navigate, user],
  );

  const debouncedRequest = useCallback(
    async (submittedValues?: GetQuoteFormValuesV2) => {
      const formValues = submittedValues ?? methods.getValues();
      methods.clearErrors('baseAmount');
      setFormError('');
      if (!formValues.baseAmount) return;
      if (formValues.baseAmount < MIN_DEFAULT_AMOUNTS[formValues.baseCurrency]) return;
      try {
        const quote = await getQuote({
          baseAmount: formValues.baseAmount,
          baseCurrency: formValues.baseCurrency,
          quoteCurrency: formValues.quoteCurrency,
          network: formValues.networkObj.key ?? '',
        });
        const tokenValue =
          formValues.operationType === 'deposit'
            ? parseFloat(String(quote?.quoteAmount ?? 0))
            : parseFloat(String(quote?.baseAmount ?? 0));
        const minValue = formValues?.tokenObj?.minAllowance ?? 0;
        const maxValue = formValues?.tokenObj?.maxAllowance ?? 0;

        if (tokenValue > maxValue) {
          methods.setError('baseAmount', {
            type: 'required',
            message: `Max ${t('quote.baseAmount')}: ${formatNumber(maxValue, 2, 18)}`,
          });
          return;
        }

        if (tokenValue < minValue) {
          methods.setError('baseAmount', {
            type: 'required',
            message: `Min ${t('quote.baseAmount')}: ${formatNumber(minValue, 2, 18)}`,
          });
          return;
        }

        if (tokenValue >= minValue && tokenValue <= maxValue) {
          methods.clearErrors('baseAmount');
        }

        return quote;
      } catch (err) {
        if ((err as AxiosError).response?.status === 404) {
          setFormError('');
          setNotFoundMessage(true);
          return;
        }
        setFormError(t('errors.general'));
        return null;
      }
    },
    [methods, getQuote, t],
  );

  const onSubmit = useCallback(
    async (formValues: GetQuoteFormValuesV2) => {
      if (isMutating) return;
      if (data?.quoteAmount) return navigateForm();

      try {
        const quote = await debouncedRequest(formValues);

        if (quote) navigateForm(quote);
      } catch {
        setFormError(t('errors.general'));
      }
    },
    [isMutating, data, navigateForm, debouncedRequest, t],
  );

  const debouncedQuoteRequest = useRef(
    debounce(debouncedRequest, REQUEST_DEBOUNCE, { leading: true }),
  );

  return (
    <BoxContainer
      sx={{ width: '100%', maxWidth: '450px', overflow: 'hidden', position: 'relative', m: '0 auto' }}
    >
      <FormProvider {...methods}>
        <form onSubmit={isMutating ? undefined : methods.handleSubmit(onSubmit)}>
          <TokensWidget
            onlyOneCurrency={HAS_ONLY_CURRENCY}
            onQuantityChange={() => debouncedQuoteRequest.current()}
            resetQuote={() => resetQuote()}
            formError={formError}
            setFormError={setFormError}
            notFoundMessage={notFoundMessage}
            isLoadingQuote={isMutating}
            rateText={
              isMutating ? (
                <CircularProgress
                  size={15}
                  sx={{ marginLeft: 1, color: 'ink.i500' }}
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
