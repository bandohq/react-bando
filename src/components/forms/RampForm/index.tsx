import BoxContainer from '@components/BoxContainer';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import CircularProgress from '@mui/material/CircularProgress';

import BandoButton from '@components/Button';
import Input from '@components/forms/Input';
import ArrowDown from '../../../assets/ArrowDown.svg';
import RampTitle, { CircularButton as ArrowButton } from './RampTitle';

import CurrencyPill from './CurrencyPill';

import useUser from '@hooks/useUser';
import useRecipient from '@hooks/useRecipient';
import useTransaction from '@hooks/useTransaction';

import { styled } from '@mui/material/styles';
import { Quote } from '@hooks/useQuote/requests';
import { Hr } from '../GetQuoteForm';

import theme from '@config/theme';
import env from '@config/env';
import { networkImg } from '@config/constants/currencies';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import schema, { ConfirmRampFormValues } from './schema';
import { useState } from 'react';

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

const GridRow = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export default function RampForm() {
  const [success, setSuccess] = useState(false);
  const { quote, network } = JSON.parse(localStorage.getItem(env.rampDataLocalStorage) ?? '') as {
    quote: Quote;
    network: string;
  };
  const { user } = useUser();
  const { postRecipient, isMutating: isRecipientMutating } = useRecipient();
  const { data, postTransaction, isMutating: isTransactionMutation } = useTransaction();
  const isLoading = isRecipientMutating || isTransactionMutation;

  const { register, handleSubmit, formState } = useForm<ConfirmRampFormValues>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      address: '',
    },
  });

  const onSubmit = async (formValues: ConfirmRampFormValues) => {
    setSuccess(false);

    try {
      const rsp = await postRecipient({
        network,
        email: user?.email ?? '',
        asset: quote.quoteCurrency,
        address: formValues.address,
      });

      const transaction = await postTransaction({
        ...quote,
        email: user?.email ?? '',
      });
      setSuccess(true);

      console.log({ rsp, transaction, success });
    } catch (err) {
      console.log({ err });
    }
  };

  if (user && quote) {
    return (
      <BoxContainer sx={{ width: '100%', maxWidth: '600px' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} sx={{ margin: 0 }}>
            <RampTitle success={success} />
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
            {success ? (
              <>
                <GridRow xs={12}>
                  <Network variant="body2">Banco:</Network>
                  <Network variant="body2" sx={{ textAlign: 'right' }}>
                    {data?.cashinDetails.bank}
                  </Network>
                </GridRow>
                <GridRow xs={12}>
                  <Network variant="body2">Nombre:</Network>
                  <Network variant="body2" sx={{ textAlign: 'right' }}>
                    {data?.cashinDetails.beneficiary}
                  </Network>
                </GridRow>
                <GridRow xs={12}>
                  <Network variant="body2">CLABE:</Network>
                  <Network variant="body2" sx={{ textAlign: 'right' }}>
                    {data?.cashinDetails.clabe}
                  </Network>
                </GridRow>
                <GridRow xs={12}>
                  <Network variant="body2">Concepto:</Network>
                  <Network variant="body2" sx={{ textAlign: 'right' }}>
                    {data?.cashinDetails.concepto}
                  </Network>
                </GridRow>
              </>
            ) : (
              <>
                <Grid md={4} sm={6} xs={7}>
                  <CurrencyPill currency={quote.baseCurrency} />
                </Grid>
                <Grid md={8} sm={6} xs={5}>
                  <Rate variant="body1">$ {quote.baseAmount}</Rate>
                  <Amount variant="body2">$ {quote.quoteRate}</Amount>
                </Grid>
                <Grid xs={12} sx={{ position: 'relative' }}>
                  <Hr sx={{ marginBottom: 2 }} />
                  <ArrowButton
                    sx={{
                      position: 'absolute',
                      margin: '0 auto',
                      top: '-12px',
                      left: 'calc(50% - 29px)',
                      pointerEvents: 'none',
                    }}
                  >
                    <img src={ArrowDown} alt="" width={42} height={42} />
                  </ArrowButton>
                </Grid>

                <Grid md={4} sm={6} xs={7}>
                  <CurrencyPill currency={quote.quoteCurrency} />
                </Grid>
                <Grid md={8} sm={6} xs={5}>
                  <Rate variant="body1">$ {quote.quoteAmount}</Rate>
                  <Amount variant="body2">$ {quote.quoteRateInverse}</Amount>
                </Grid>
                <GridRow xs={12}>
                  <Network variant="body2">Red:</Network>
                  <Network variant="body2" sx={{ textAlign: 'right', textTransform: 'capitalize' }}>
                    {network.toLowerCase()}{' '}
                    <img
                      alt="Network"
                      src={networkImg[network as keyof typeof networkImg]}
                      width={18}
                      height={18}
                    />
                  </Network>
                </GridRow>
              </>
            )}
          </Grid>

          {!success && (
            <Grid container spacing={2} sx={{ mx: 0, my: 1 }}>
              <Grid xs={12}>
                <Input
                  label="Recibes en esta dirección"
                  type="text"
                  {...register('address')}
                  error={!!formState.errors.address?.message}
                  helpText={formState.errors.address?.message ?? undefined}
                />
              </Grid>

              <Grid xs={12}>
                <BandoButton
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={isLoading}
                  sx={{ padding: '16px 8px', fontWeight: 'bold' }}
                >
                  {isLoading && (
                    <CircularProgress size={16} sx={{ mr: 1, ml: -2, color: '#fff' }} />
                  )}
                  Confirmar
                </BandoButton>
              </Grid>
            </Grid>
          )}
        </form>
      </BoxContainer>
    );
  }
  return null;
}
