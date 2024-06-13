import BoxContainer from '@components/BoxContainer';
import { useNavigate } from 'react-router-dom';

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

import { Quote } from '@hooks/useQuote/requests';
import env from '@config/env';

const REQUEST_DEBOUNCE = 250;
const HAS_ONLY_CURRENCY = true;
const DEFAULT_CURRENCY = 'MXN';
const DEFAULT_OPERATION = 'deposit';

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
  const { isMutating, quote: data, getQuote, resetQuote } = useQuote();
  const [formError, setFormError] = useState<string>('');

  const { user } = useUser();
  const methods = useForm<GetQuoteFormValuesV2>({
    resolver: yupResolver(schemaV2),
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
          network: formValues.networkObj.key ?? '',
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
      console.log({ errors: methods.formState.errors });
      // const baseValue = parseFloat(String(formValues.baseAmount));
      // const minValue = formValues?.tokenObj?.minAllowance ?? 0;
      // const maxValue = formValues?.tokenObj?.maxAllowance ?? 0;

      if (isMutating) return;
      if (Object.keys(methods.formState.errors).length) return;
      // if (baseValue > maxValue) {
      //   methods.setError('baseAmount', {
      //     type: 'required',
      //     message: `El valor es mayor al maximo permitido de ${formatNumber(maxValue, 2, 18)}`,
      //   });
      //   return;
      // }

      // if (baseValue < minValue) {
      //   methods.setError('baseAmount', {
      //     type: 'required',
      //     message: `El valor es menor al minimo permitido de ${formatNumber(minValue, 2, 18)}`,
      //   });
      //   return;
      // }

      if (data?.quoteAmount) return navigateForm();
      setFormError('');
      try {
        const quote = await getQuote({
          baseAmount: formValues.baseAmount,
          baseCurrency: formValues.baseCurrency,
          quoteCurrency: formValues.quoteCurrency,
          network: formValues.networkObj.key ?? '',
        });

        navigateForm(quote);
      } catch {
        setFormError('Ha ocurrido un error.');
      }
    },
    [getQuote, isMutating, data, navigateForm, methods],
  );

  const debouncedRequest = useCallback(async () => {
    const formValues = methods.getValues();
    setFormError('');
    if (!formValues.baseAmount) return;
    try {
      const quote = await getQuote({
        baseAmount: formValues.baseAmount,
        baseCurrency: formValues.baseCurrency,
        quoteCurrency: formValues.quoteCurrency,
        network: formValues.networkObj.key ?? '',
      });

      //  const baseValue = parseFloat(String(formValues.baseAmount));
      const quoteValue = parseFloat(String(quote?.quoteAmount ?? 0));
      const minValue = formValues?.tokenObj?.minAllowance ?? 0;
      const maxValue = formValues?.tokenObj?.maxAllowance ?? 0;

      console.log({ quoteValue, minValue, maxValue });

      if (quoteValue > maxValue) {
        methods.setError('baseAmount', {
          type: 'required',
          message: `El valor es mayor al maximo permitido de ${formatNumber(maxValue, 2, 18)}`,
        });
      }

      if (quoteValue < minValue) {
        methods.setError('baseAmount', {
          type: 'required',
          message: `El valor es menor al minimo permitido de ${formatNumber(minValue, 2, 18)}`,
        });
      }

      if (quoteValue >= minValue && quoteValue <= maxValue) {
        methods.clearErrors('baseAmount');
      }

      return quote;
    } catch {
      setFormError('Ha ocurrido un error.');
      return null;
    }
  }, [methods, getQuote]);

  const debouncedQuoteRequest = useRef(
    debounce(debouncedRequest, REQUEST_DEBOUNCE, { leading: true }),
  );

  return (
    <BoxContainer
      sx={{ width: '100%', maxWidth: '600px', overflow: 'hidden', position: 'relative' }}
    >
      <FormProvider {...methods}>
        <form onSubmit={isMutating ? undefined : methods.handleSubmit(onSubmit)}>
          <TokensWidget
            onlyOneCurrency={HAS_ONLY_CURRENCY}
            defaultCurrency={DEFAULT_CURRENCY}
            onQuantityChange={() => debouncedQuoteRequest.current()}
            resetQuote={() => resetQuote()}
            formError={formError}
            isLoadingQuote={isMutating}
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
