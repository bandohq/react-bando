import Grid from '@mui/material/Unstable_Grid2';
import BoxContainer from '@components/BoxContainer';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import { ChangeEvent, useCallback, useRef } from 'react';
import debounce from 'lodash/debounce';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import schema, { GetQuoteFormValues } from './schema';

import BandoButton from '@components/Button';
import Input from '@components/forms/Input';
import Select from '@components/forms/Select';
import Hr from '@components/Hr';

import Polygon from '../../../assets/polygon.png';
import Ethereum from '../../../assets/ethereum.png';
import TokensWidget from '@components/TokensWidget';

import useQuote from '@hooks/useQuote';
import useUser from '@hooks/useUser';
import useTokens from '@hooks/useTokens';
import useNetworks from '@hooks/useNetworks';

import { sendCurrency, depositCurrency } from '@config/constants/currencies';
import { Quote } from '@hooks/useQuote/requests';
import env from '@config/env';
import formatNumber from '@helpers/formatNumber';

const REQUEST_DEBOUNCE = 250;

export const CurrencyImg = styled('img')(({ theme }) => ({
  marginTop: '-10px',
  marginBottom: '-10px',
  padding: 0,
  marginRight: theme.spacing(1),
  width: 37,
  height: 37,
}));

export default function GetQuoteForm({ enableNewWidget = false }) {
  const navigate = useNavigate();
  const { isMutating, data, getQuote } = useQuote();
  const { user } = useUser();
  const { register, handleSubmit, setValue, watch, formState, getValues } =
    useForm<GetQuoteFormValues>({
      resolver: yupResolver(schema),
      defaultValues: {
        quoteCurrency: 'USDC',
        baseCurrency: 'MXN',
        operationType: 'deposit',
      },
    });

  const { networks } = useNetworks();
  const { tokens } = useTokens({ chainKey: 'pol' });
  const quoteCurrency = watch('quoteCurrency');
  const baseCurrency = watch('baseCurrency');
  const operationType = watch('operationType');
  const baseAmount = watch('baseAmount');

  console.log({ tokens, networks });

  const depositCurrencyItems = operationType === 'deposit' ? sendCurrency : depositCurrency;
  const sendCurrencyItems = operationType === 'deposit' ? depositCurrency : sendCurrency;
  const operationCurrency = operationType === 'deposit' ? baseCurrency : quoteCurrency;
  const rateText =
    operationType === 'deposit'
      ? `1 ${quoteCurrency} ≈ $${formatNumber(data?.quoteRateInverse) ?? 0} ${baseCurrency}`
      : `1 ${baseCurrency} ≈ $${formatNumber(data?.quoteRate) ?? 0} ${quoteCurrency}`;

  const debouncedRequest = useCallback(
    (formValues: GetQuoteFormValues) =>
      getQuote({
        baseAmount: formValues.baseAmount,
        baseCurrency: formValues.baseCurrency,
        quoteCurrency: formValues.quoteCurrency,
        network: formValues.network,
      }).catch(() => null),
    [getQuote],
  );

  const navigateForm = useCallback(
    (quote?: Quote) => {
      const formValues = getValues();
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
    [data, getValues, navigate, user],
  );

  const onSubmit = useCallback(
    async (formValues: GetQuoteFormValues) => {
      if (data?.quoteAmount) return navigateForm();
      try {
        const quote = await getQuote({
          baseAmount: formValues.baseAmount,
          baseCurrency: formValues.baseCurrency,
          quoteCurrency: formValues.quoteCurrency,
          network: formValues.network,
        });

        navigateForm(quote);
      } catch {
        // TODO: Handle error
      }
    },
    [getQuote, data, navigateForm],
  );

  const debouncedQuoteRequest = useRef(
    debounce(handleSubmit(debouncedRequest), REQUEST_DEBOUNCE, { leading: true }),
  );

  const onChangeCurrencySelects = useCallback(() => {
    if (baseAmount > 0) handleSubmit(debouncedRequest)();
  }, [baseAmount, debouncedRequest, handleSubmit]);

  const onChangeOperationType = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const { value } = event.target;
      const depositCurrencyItms = value === 'deposit' ? sendCurrency : depositCurrency;
      const sendCurrencyItms = value === 'deposit' ? depositCurrency : sendCurrency;
      setValue('baseCurrency', depositCurrencyItms[0].value);
      setValue('quoteCurrency', sendCurrencyItms[0].value);
      if (baseAmount > 0) handleSubmit(debouncedRequest)();
    },
    [baseAmount, debouncedRequest, handleSubmit, setValue],
  );

  const onQuantityChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.target.value = event.target.value.replace(/[^0-9.]/g, '');
    const { value } = event.target;
    const idx = value.indexOf('.');

    event.target.value = idx >= 0 ? value.slice(0, idx + 3) : value;
    debouncedQuoteRequest.current();
  };

  return (
    <BoxContainer sx={{ width: '100%', maxWidth: '600px' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {enableNewWidget ? (
          <TokensWidget />
        ) : (
          <Grid container spacing={2} sx={{ margin: 0 }}>
            <Grid xs={12}>
              <Select
                defaultValue={'deposit'}
                fullWidth={false}
                mantainLabel={false}
                className="no-border"
                sx={{
                  width: 'fit-content',
                  fontWeight: '500',
                  fontSize: '1.5rem !important',
                  color: 'palette.ink.i900',
                }}
                {...register('operationType', { onChange: onChangeOperationType })}
                items={[
                  {
                    label: `Deposita ${operationCurrency}`,
                    value: 'deposit',
                  },
                  {
                    label: `Retira ${operationCurrency}`,
                    value: 'withdraw',
                  },
                ]}
              />
            </Grid>

            <Grid xs={12}>
              <Select
                defaultValue={'POLYGON'}
                label="Red a recibir"
                items={[
                  {
                    label: 'Polygon',
                    value: 'POLYGON',
                    startComponent: <CurrencyImg src={Polygon} />,
                  },
                  {
                    label: 'Ethereum',
                    value: 'ETHEREUM',
                    startComponent: <CurrencyImg src={Ethereum} />,
                    hide: true,
                  },
                ]}
                {...register('network')}
              />
            </Grid>

            <Grid md={8} sm={6} xs={12}>
              <Input
                label="Envias"
                type="text"
                inputMode="numeric"
                {...register('baseAmount', { onChange: onQuantityChange })}
                helpText={formState.errors.baseAmount?.message}
                error={!!formState.errors.baseAmount?.message}
              />
            </Grid>
            <Grid md={4} sm={6} xs={12}>
              <Select
                items={depositCurrencyItems}
                value={baseCurrency}
                {...register('baseCurrency', { onChange: onChangeCurrencySelects })}
                error={!!formState.errors.baseCurrency?.message}
                helpText={formState.errors.baseCurrency?.message}
              />
            </Grid>
            <Grid md={8} sm={6} xs={12}>
              <Input
                label="Recibes"
                type="text"
                name="quoteAmount"
                value={formatNumber(data?.quoteAmount ?? 0)}
                helpText={
                  <>
                    {isMutating ? (
                      <CircularProgress
                        size={15}
                        sx={{ marginLeft: 1, color: 'palette.ink.i500' }}
                        aria-label="submitting"
                      />
                    ) : (
                      rateText
                    )}
                  </>
                }
                disabled
              />
            </Grid>
            <Grid md={4} sm={6} xs={12}>
              <Select
                items={sendCurrencyItems}
                value={quoteCurrency}
                {...register('quoteCurrency', { onChange: onChangeCurrencySelects })}
                error={!!formState.errors.quoteCurrency?.message}
              />
            </Grid>

            <Grid xs={12}>
              <Hr sx={{ marginBottom: 2 }} />
            </Grid>
            <Grid xs={12}>
              <BandoButton
                type="submit"
                variant="contained"
                fullWidth
                sx={{ padding: '16px 8px', fontWeight: 'bold' }}
              >
                Continuar
              </BandoButton>
            </Grid>
          </Grid>
        )}
      </form>
    </BoxContainer>
  );
}
