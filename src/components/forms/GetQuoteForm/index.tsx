import Grid from '@mui/material/Unstable_Grid2';
import BoxContainer from '@components/BoxContainer';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import { ChangeEvent, useCallback, useMemo, useRef } from 'react';
import debounce from 'lodash/debounce';

import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import schema, { GetQuoteFormValues } from './schema';

import BandoButton from '@components/Button';
import Input from '@components/forms/Input';
import Select, { CustomSelectProps } from '@components/forms/Select';
import Hr from '@components/Hr';
import env from '@config/env';

import useQuote from '@hooks/useQuote';
import useUser from '@hooks/useUser';
import { sendCurrency } from '@config/constants/currencies';
import { Quote } from '@hooks/useQuote/requests';
import formatNumber from '@helpers/formatNumber';

import networkOptsOnRamp, {
  networkOptionsOffRamp as networkOptsOffRamp,
} from '@config/constants/networks';

const REQUEST_DEBOUNCE = 250;
const DEFAULT_NETWORK = 'pol';
const DEFAULT_BASE_CURRENCY = 'MXN';
const DEFAULT_QUOTE_CURRENCY = 'USDC';
const DEFAULT_OPERATION = 'deposit';

export const CurrencyImg = styled('img')(({ theme }) => ({
  marginTop: '-10px',
  marginBottom: '-10px',
  padding: 0,
  marginRight: theme.spacing(1),
  width: 37,
  height: 37,
}));

export default function GetQuoteForm() {
  const navigate = useNavigate();
  const { isMutating, data, getQuote } = useQuote();
  const { user } = useUser();
  const { register, handleSubmit, setValue, watch, formState, getValues, ...methods } =
    useForm<GetQuoteFormValues>({
      resolver: yupResolver(schema),
      defaultValues: {
        network: DEFAULT_NETWORK,
        quoteCurrency: DEFAULT_QUOTE_CURRENCY,
        baseCurrency: DEFAULT_BASE_CURRENCY,
        operationType: DEFAULT_OPERATION,
      },
    });

  const quoteCurrency = watch('quoteCurrency');
  const baseCurrency = watch('baseCurrency');
  const optType = watch('operationType');
  const baseAmount = watch('baseAmount');
  const network = watch('network');

  const networkOptions = optType === DEFAULT_OPERATION ? networkOptsOnRamp : networkOptsOffRamp;
  const depositCurrency = useMemo(() => {
    return networkOptions[network]?.chains?.map((chain) => ({
      label: chain.label,
      value: chain.value,
      startComponent: <CurrencyImg src={chain.img} sx={{ width: 32, height: 32 }} />,
    }));
  }, [network, networkOptions]);

  const depositCurrencyItems = optType === DEFAULT_OPERATION ? sendCurrency : depositCurrency;
  const sendCurrencyItems = optType === DEFAULT_OPERATION ? depositCurrency : sendCurrency;
  const rateText =
    optType === DEFAULT_OPERATION
      ? `1 ${quoteCurrency} ≈ ${formatNumber(data?.quoteRateInverse, 2, 18) ?? 0} ${baseCurrency}`
      : `1 ${baseCurrency} ≈ ${formatNumber(data?.quoteRate, 2, 18) ?? 0} ${quoteCurrency}`;

  const debouncedRequest = useCallback(
    (formValues: GetQuoteFormValues) =>
      getQuote({
        baseAmount: formValues.baseAmount,
        baseCurrency: formValues.baseCurrency,
        quoteCurrency: formValues.quoteCurrency,
        network: formValues.network.toUpperCase(),
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
          network: formValues.network.toUpperCase(),
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
          network: formValues.network.toUpperCase(),
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
      const depositCurrencyItms =
        value === DEFAULT_OPERATION ? DEFAULT_BASE_CURRENCY : DEFAULT_QUOTE_CURRENCY;
      const sendCurrencyItms =
        value === DEFAULT_OPERATION ? DEFAULT_QUOTE_CURRENCY : DEFAULT_BASE_CURRENCY;

      setValue('network', DEFAULT_NETWORK);
      setValue('baseCurrency', depositCurrencyItms);
      setValue('quoteCurrency', sendCurrencyItms);
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

  const networkSelectItems = useMemo(() => {
    return Object.values(networkOptions)?.reduce(
      (acc, network) => {
        if (acc && network.enabled) {
          acc.push({
            label: network.label,
            value: network.value,
            startComponent: <CurrencyImg src={network.img} />,
          });
        }
        return acc;
      },
      [] as CustomSelectProps['items'],
    );
  }, [networkOptions]);

  return (
    <BoxContainer sx={{ width: '100%', maxWidth: '600px' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} sx={{ margin: 0 }}>
          <Grid xs={12}>
            <Select
              defaultValue={DEFAULT_OPERATION}
              fullWidth={false}
              mantainLabel={false}
              className="no-border"
              {...register('operationType', { onChange: onChangeOperationType })}
              sx={{
                width: 'fit-content',
                fontWeight: '500',
                fontSize: '1.5rem !important',
                color: 'palette.ink.i900',
              }}
              items={[
                {
                  label: 'Compra cripto',
                  value: DEFAULT_OPERATION,
                },
                {
                  label: 'Vende cripto',
                  value: 'withdraw',
                },
              ]}
            />
          </Grid>

          <Grid xs={12}>
            <Controller
              name="network"
              control={methods.control}
              render={({ field: { onChange, value } }) => (
                <Select
                  label="Red a recibir"
                  items={networkSelectItems}
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  error={!!formState.errors.network?.message}
                  helpText={formState.errors.network?.message}
                />
              )}
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
              sx={{ '& .MuiSelect-select': { px: 1.5 } }}
              error={!!formState.errors.baseCurrency?.message}
              helpText={formState.errors.baseCurrency?.message}
            />
          </Grid>
          <Grid md={8} sm={6} xs={12}>
            <Input
              label="Recibes"
              type="text"
              name="quoteAmount"
              value={formatNumber(data?.quoteAmount ?? 0, 2, 18)}
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
              sx={{ '& .MuiSelect-select': { px: 1.5 } }}
              error={!!formState.errors.quoteCurrency?.message}
              helpText={formState.errors.quoteCurrency?.message}
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
      </form>
    </BoxContainer>
  );
}
