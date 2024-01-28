import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
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

import useQuote from '@hooks/useQuote';
import useUser from '@hooks/useUser';
import { sendCurrency, depositCurrency } from '@config/constants/currencies';
import env from '@config/env';

const REQUEST_DEBOUNCE = 250;

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
  const { register, handleSubmit, setValue, watch, formState } = useForm<GetQuoteFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      quoteCurrency: 'USDC',
      baseCurrency: 'MXN',
      operationType: 'deposit',
    },
  });
  const quoteCurrency = watch('quoteCurrency');
  const baseCurrency = watch('baseCurrency');
  const operationType = watch('operationType');
  const baseAmount = watch('baseAmount');

  const depositCurrencyItems = operationType === 'deposit' ? sendCurrency : depositCurrency;
  const sendCurrencyItems = operationType === 'deposit' ? depositCurrency : sendCurrency;
  const operationCurrency = operationType === 'deposit' ? baseCurrency : quoteCurrency;

  const debouncedRequest = useCallback(
    (formValues: GetQuoteFormValues) =>
      getQuote({
        baseAmount: formValues.baseAmount,
        baseCurrency: formValues.baseCurrency,
        quoteCurrency: formValues.quoteCurrency,
      }).catch(() => null),
    [getQuote],
  );

  const fetchQuote = useCallback(
    async (formValues: GetQuoteFormValues) => {
      try {
        const quote = await getQuote({
          baseAmount: formValues.baseAmount,
          baseCurrency: formValues.baseCurrency,
          quoteCurrency: formValues.quoteCurrency,
        });

        localStorage.setItem(
          env.rampDataLocalStorage,
          JSON.stringify({
            quote,
            network: formValues.network,
            operationType: formValues.operationType,
          }),
        );
        if (!user?.email && !user?.id) return navigate('/signin');
        if (!user?.kycLevel && user?.email) return navigate('/kyc');
        return navigate('/ramp');
      } catch {
        // TODO: Handle error
      }
    },
    [getQuote, navigate, user],
  );

  const debouncedQuoteRequest = useRef(
    debounce(handleSubmit(debouncedRequest), REQUEST_DEBOUNCE, { leading: true }),
  );

  const onChangeCurrencySelects = useCallback(() => {
    if (baseAmount > 0) handleSubmit(debouncedRequest)();
  }, [baseAmount, debouncedRequest, handleSubmit]);

  const onChangeOperationType = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    const depositCurrencyItms = value === 'deposit' ? sendCurrency : depositCurrency;
    const sendCurrencyItms = value === 'deposit' ? depositCurrency : sendCurrency;
    setValue('baseCurrency', depositCurrencyItms[0].value);
    setValue('quoteCurrency', sendCurrencyItms[0].value);
  };

  const onQuantityChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.target.value = event.target.value.replace(/[^0-9.]/g, '');
    const { value } = event.target;
    const idx = value.indexOf('.');

    event.target.value = idx >= 0 ? value.slice(0, idx + 3) : value;
    debouncedQuoteRequest.current();
  };

  return (
    <BoxContainer sx={{ width: '100%', maxWidth: '600px' }}>
      <form onSubmit={handleSubmit(fetchQuote)}>
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
                },
              ]}
              {...register('network')}
            />
          </Grid>

          <Grid md={8} sm={6} xs={7}>
            <Input
              label="Envias"
              type="text"
              inputMode="numeric"
              {...register('baseAmount', { onChange: onQuantityChange })}
              error={!!formState.errors.baseAmount?.message}
            />
          </Grid>
          <Grid md={4} sm={6} xs={5}>
            <Select
              items={depositCurrencyItems}
              value={baseCurrency}
              {...register('baseCurrency', { onChange: onChangeCurrencySelects })}
              error={!!formState.errors.baseCurrency?.message}
            />
          </Grid>
          <Grid md={8} sm={6} xs={7}>
            <Input
              label="Recibes"
              type="number"
              name="quoteAmount"
              value={data?.quoteAmount ?? 0}
              helpText={
                <>
                  Tipo de cambio ({baseCurrency}/{quoteCurrency}):&nbsp;
                  {isMutating ? (
                    <CircularProgress
                      size={15}
                      sx={{ marginLeft: 1, color: 'palette.ink.i500' }}
                      aria-label="submitting"
                    />
                  ) : (
                    <strong>{data?.quoteRateInverse ?? 0}</strong>
                  )}
                </>
              }
              disabled
            />
          </Grid>
          <Grid md={4} sm={6} xs={5}>
            <Select
              items={sendCurrencyItems}
              value={quoteCurrency}
              {...register('quoteCurrency', { onChange: onChangeCurrencySelects })}
              error={!!formState.errors.quoteCurrency?.message}
            />
          </Grid>

          <Grid xs={12}>
            <Hr sx={{ marginBottom: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2">Comisión de depósito</Typography>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                2 USDT
              </Typography>
            </Box>
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
