import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import BoxContainer from '@components/BoxContainer';
import { styled } from '@mui/material/styles';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RequestQuoteArgs } from '@hooks/useQuote/requests';
import schema from './schema';

import BandoButton from '@components/Button';
import Input from '@components/forms/Input';
import Select from '@components/forms/Select';

import Currency from '../../../assets/currency.svg';
import Arbitrum from '../../../assets/arbitrum.svg';
import Usdt from '../../../assets/usdt.svg';

import useQuote from '@hooks/useQuote';

const Hr = styled('hr')(({ theme }) => ({
  backgroundColor: theme.palette.ink.i300,
  height: 1,
  width: '100%',
  border: 0,
}));

export const CurrencyImg = styled('img')(({ theme }) => ({
  marginTop: '-10px',
  marginBottom: '-10px',
  padding: 0,
  marginRight: theme.spacing(1),
  width: 37,
  height: 37,
}));

export default function GetQuoteForm() {
  const { register, handleSubmit, setValue, watch, formState } = useForm<RequestQuoteArgs>({
    resolver: yupResolver(schema),
    defaultValues: {
      quoteCurrency: 'USDC',
      baseCurrency: 'MXN',
    },
  });
  const quoteCurrency = watch('quoteCurrency');
  const baseCurrency = watch('baseCurrency');

  const { isMutating, data, getQuote } = useQuote();

  const changeCurrencyType = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const alternateValue = value === 'MXN' ? 'USDC' : 'MXN';
    const alternateField = event.target.name === 'baseCurrency' ? 'quoteCurrency' : 'baseCurrency';

    setValue(alternateField, alternateValue);
    handleSubmit(fetchQuote)();
  };

  const fetchQuote = (formValues: RequestQuoteArgs) => {
    getQuote(formValues);
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
              items={[
                {
                  label: 'Deposita MXN',
                  value: 'deposit',
                },
                {
                  label: 'Retira MXN',
                  value: 'withdraw',
                },
              ]}
            />
          </Grid>

          <Grid md={8} sm={6} xs={7}>
            <Input
              label="Envias"
              type="number"
              onKeyDown={(event) => {
                if (event.key === '.') event.preventDefault();
              }}
              {...register('baseAmount')}
              onBlur={handleSubmit(fetchQuote)}
              disabled={isMutating}
              error={!!formState.errors.baseAmount?.message}
            />
          </Grid>
          <Grid md={4} sm={6} xs={5}>
            <Select
              items={[
                {
                  label: 'MXN',
                  value: 'MXN',
                  startComponent: <CurrencyImg src={Currency} />,
                },
                {
                  label: 'USDC',
                  value: 'USDC',
                  startComponent: <CurrencyImg src={Usdt} />,
                },
              ]}
              value={baseCurrency}
              {...register('baseCurrency', { onChange: changeCurrencyType })}
              disabled={isMutating}
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
                  Tipo de cambio (USDT/MXN): <strong>16.83</strong>
                </>
              }
              disabled
            />
          </Grid>
          <Grid md={4} sm={6} xs={5}>
            <Select
              items={[
                {
                  label: 'MXN',
                  value: 'MXN',
                  startComponent: <CurrencyImg src={Currency} />,
                },
                {
                  label: 'USDC',
                  value: 'USDC',
                  startComponent: <CurrencyImg src={Usdt} />,
                },
              ]}
              value={quoteCurrency}
              {...register('quoteCurrency', { onChange: changeCurrencyType })}
              disabled={isMutating}
              error={!!formState.errors.quoteCurrency?.message}
            />
          </Grid>
          <Grid xs={12}>
            <Select
              defaultValue={'arbitrum'}
              label="Red a recibir"
              items={[
                {
                  label: 'Arbitrum',
                  value: 'arbitrum',
                  startComponent: <CurrencyImg src={Arbitrum} />,
                },
              ]}
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
              Depositar
            </BandoButton>
          </Grid>
        </Grid>
      </form>
    </BoxContainer>
  );
}
