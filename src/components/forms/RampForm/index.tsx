import BoxContainer from '@components/BoxContainer';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';

import BandoButton from '@components/Button';
import Input from '@components/forms/Input';
import Select from '@components/forms/Select';
import Arbitrum from '../../../assets/arbitrum.svg';
import ArrowDown from '../../../assets/ArrowDown.svg';

import useUser from '@hooks/useUser';
import useRecipient from '@hooks/useRecipient';

import { styled } from '@mui/material/styles';
import { sendCurrency, depositCurrency } from '@config/constants/currencies';
import { Quote } from '@hooks/useQuote/requests';
import { Hr } from '../GetQuoteForm';
import theme from '@config/theme';
import env from '@config/env';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import schema, { ConfirmRampFormValues } from './schema';

const ArrowButton = styled(Button)(() => ({
  borderRadius: '50%',
  aspectRatio: '1/1',
  width: 'fit-content',
}));

const Rate = styled(Typography)(({ theme }) => ({
  fontSize: `${theme.typography.pxToRem(28)} !important`,
  fontWeight: '500',
  textAlign: 'right',
}));

const Amount = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.pxToRem(14),
  fontWeight: 'normal',
  color: theme.palette.ink.i500,
  textAlign: 'right',
}));

const Network = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.pxToRem(14),
  color: theme.palette.ink.i700,
  textAlign: 'left',
  width: 'fit-content',
  lineHeight: 'normal',
}));

export default function RampForm() {
  const quote = JSON.parse(localStorage.getItem(env.rampDataLocalStorage) ?? '') as Quote;
  const { user } = useUser();
  const { postRecipient } = useRecipient();

  const { register, handleSubmit, formState } = useForm<ConfirmRampFormValues>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      address: '',
    },
  });

  const onSubmit = async (formValues: ConfirmRampFormValues) => {
    console.log({
      email: user?.email ?? '',
      asset: quote.quoteCurrency,
      address: formValues.address,
    });
    const rsp = await postRecipient({
      email: user?.email ?? '',
      asset: quote.quoteCurrency,
      address: formValues.address,
    });
    console.log({ rsp });
  };

  if (user && quote) {
    return (
      <BoxContainer sx={{ width: '100%', maxWidth: '600px' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} sx={{ margin: 0 }}>
            <Grid xs={12}>
              <Typography variant="body1">Confirma</Typography>
            </Grid>
          </Grid>

          <Grid
            container
            spacing={2}
            sx={{
              margin: theme.spacing(0, 1),
              width: 'calc(100% - 16px) !important',
              border: '1px solid #E6E7E9',
              borderRadius: '12px',
              padding: 2,
            }}
          >
            <Grid md={4} sm={6} xs={7}>
              <Select
                className="rounded"
                items={sendCurrency}
                value={quote.baseCurrency}
                mantainLabel={false}
              />
            </Grid>
            <Grid md={8} sm={6} xs={5}>
              <Rate variant="body1">{quote.baseAmount}</Rate>
              <Amount variant="body2">$ {quote.quoteRate}</Amount>
            </Grid>
            <Grid xs={12} sx={{ position: 'relative' }}>
              <Hr sx={{ marginBottom: 2 }} />
              <ArrowButton
                sx={{
                  position: 'absolute',
                  margin: '0 auto',
                  top: '-12px',
                  left: 'calc(50% - 32px)',
                }}
              >
                <img src={ArrowDown} alt="" width={42} height={42} />
              </ArrowButton>
            </Grid>

            <Grid md={4} sm={6} xs={7}>
              <Select
                value={quote.quoteCurrency}
                className="rounded"
                items={depositCurrency}
                mantainLabel={false}
              />
            </Grid>
            <Grid md={8} sm={6} xs={5}>
              <Rate variant="body1">{quote.quoteAmount}</Rate>
              <Amount variant="body2">$ {quote.quoteRateInverse}</Amount>
            </Grid>
            <Grid
              xs={12}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Network variant="body2">Red:</Network>
              <Network variant="body2" sx={{ textAlign: 'right' }}>
                Arbitrum <img alt="Arbitrum" src={Arbitrum} width={18} height={18} />
              </Network>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mx: 0, my: 1 }}>
            <Grid xs={12}>
              <Input
                label="Recibes en esta red"
                type="text"
                {...register('address')}
                error={!!formState.errors.address?.message}
                helpText={formState.errors.address?.message || undefined}
              />
            </Grid>

            <Grid xs={12}>
              <BandoButton
                type="submit"
                variant="contained"
                fullWidth
                sx={{ padding: '16px 8px', fontWeight: 'bold' }}
              >
                Confirmar
              </BandoButton>
            </Grid>
          </Grid>
        </form>
      </BoxContainer>
    );
  }
  return null;
}
