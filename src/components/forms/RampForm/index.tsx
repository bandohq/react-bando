import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import schema, { ConfirmRampFormValues } from './schema';
import { AxiosError } from 'axios';

import BoxContainer from '@components/BoxContainer';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import CircularProgress from '@mui/material/CircularProgress';

import Hr from '@components/Hr';
import BandoButton from '@components/Button';
import Input from '@components/forms/Input';
import ErrorBox from '@components/forms/ErrorBox';
import ArrowDown from '../../../assets/ArrowDown.svg';
import CurrencyPill from './CurrencyPill';
import RampTitle, { CircularButton as ArrowButton } from './RampTitle';
import { styled } from '@mui/material/styles';

import useUser from '@hooks/useUser';
import useRecipient from '@hooks/useRecipient';
import useTransaction from '@hooks/useTransaction';
import getStorageQuote from '@helpers/getStorageQuote';

import theme from '@config/theme';
import { networkImg } from '@config/constants/currencies';
import { checkNumberLength, allowOnlyNumbers } from '@helpers/inputs';
import { Quote } from '@hooks/useQuote/requests';

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

const GridRow = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

type RampFormProps = {
  noContainer?: boolean;
};

export default function RampForm({ noContainer = false }: Readonly<RampFormProps>) {
  const [success, setSuccess] = useState(false);
  const [recipientError, setRecipientError] = useState(false);
  const [forbiddenError, setForbiddenError] = useState(false);
  const { quote, network = '', operationType: opType } = getStorageQuote();

  const { user } = useUser();
  const { postRecipient, isMutating: isRecipientMutating } = useRecipient();
  const { data, postTransaction, isMutating: isTransactionMutation } = useTransaction();
  const isLoading = isRecipientMutating || isTransactionMutation;
  const FormContainer = noContainer ? Box : BoxContainer;

  const { register, handleSubmit, formState, watch, setValue } = useForm<ConfirmRampFormValues>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      address: '',
    },
  });

  const operationType = watch('operationType');

  const onSubmit = async (formValues: ConfirmRampFormValues) => {
    setSuccess(false);
    setRecipientError(false);
    setForbiddenError(false);

    try {
      await postRecipient({
        network: network ?? '',
        email: user?.email ?? '',
        asset: quote?.quoteCurrency ?? '',
        address: formValues?.address ?? '',
        firstName: formValues?.firstName ?? '',
        lastName: formValues?.lastName ?? '',
        clabe: formValues?.clabe ?? '',
      });
    } catch (err) {
      if ((err as AxiosError).response?.status === 403) {
        setForbiddenError(true);
        return;
      }
      setRecipientError(true);
      return;
    }

    await postTransaction({
      ...(quote as Quote),
      accountAddress:
        (formValues?.operationType === 'deposit' ? formValues?.address : formValues.clabe) ?? '',
      accountNetwork: network ?? '',
      operationType: formValues?.operationType ?? '',
      cashinChain: network ?? '',
    });

    setSuccess(true);
  };

  useEffect(() => {
    if (opType) setValue('operationType', opType);
  }, [opType, setValue]);

  if (user && quote) {
    return (
      <FormContainer sx={{ width: '100%', maxWidth: '600px' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} sx={{ margin: 0 }}>
            <RampTitle success={success} noArrow={noContainer} />
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
              <CurrencyPill currency={quote.baseCurrency} />
            </Grid>
            <Grid md={8} sm={6} xs={5}>
              <Rate variant="body1">$ {quote.baseAmount}</Rate>
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
                {network?.toLowerCase()}{' '}
                <img
                  alt="Network"
                  src={networkImg[network as keyof typeof networkImg]}
                  width={18}
                  height={18}
                />
              </Network>
            </GridRow>
          </Grid>

          {!success ? (
            <Grid container spacing={2} sx={{ mx: 0, my: 1 }}>
              {operationType === 'deposit' ? (
                <Grid xs={12}>
                  <Input
                    label="Recibes en esta dirección"
                    type="text"
                    {...register('address')}
                    error={!!formState.errors.address?.message}
                    helpText={formState.errors.address?.message ?? undefined}
                  />
                </Grid>
              ) : (
                <>
                  <Grid md={6}>
                    <Input
                      label="Nombres"
                      type="text"
                      {...register('firstName')}
                      error={!!formState.errors.firstName?.message}
                    />
                  </Grid>
                  <Grid md={6}>
                    <Input
                      label="Apellidos"
                      type="text"
                      {...register('lastName')}
                      error={!!formState.errors.lastName?.message}
                    />
                  </Grid>
                  <Grid xs={12}>
                    <Input
                      label="Clabe"
                      type="text"
                      {...register('clabe', {
                        onChange: (e) => {
                          allowOnlyNumbers(e);
                          checkNumberLength(e, 18);
                        },
                      })}
                      error={!!formState.errors.address?.message}
                    />
                  </Grid>
                </>
              )}
              {recipientError && (
                <Grid xs={12}>
                  <ErrorBox>Esta cuenta ha sido rechazada por Bando. Intenta con otra.</ErrorBox>
                </Grid>
              )}
              {forbiddenError && (
                <Grid xs={12}>
                  <ErrorBox>
                    Bando está en beta privado. Para poder ser de nuestros primeros usuarios envía
                    un correo a hola@bando.cool
                  </ErrorBox>
                </Grid>
              )}
              <Grid xs={12}>
                <BandoButton
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={isLoading}
                  sx={{ padding: '16px 8px', fontWeight: 'bold' }}
                >
                  {isLoading && (
                    <CircularProgress
                      size={16}
                      sx={{ mr: 1, ml: -2, color: '#fff' }}
                      aria-label="submitting"
                    />
                  )}
                  Confirmar
                </BandoButton>
              </Grid>
            </Grid>
          ) : (
            <Grid container spacing={2} sx={{ mx: 0, my: 1, padding: 1 }}>
              <GridRow xs={12}>
                <Typography variant="h6" sx={{ color: '#40B494' }}>
                  Deposita tu MXN a esta cuenta.
                </Typography>
              </GridRow>
              <GridRow xs={12}>
                <Network variant="body2" sx={{ fontWeight: 'bold' }}>
                  Banco:
                </Network>
                <Network variant="body2" sx={{ textAlign: 'right' }}>
                  {data?.cashinDetails.bank}
                </Network>
              </GridRow>
              <GridRow xs={12}>
                <Network variant="body2" sx={{ fontWeight: 'bold' }}>
                  Nombre:
                </Network>
                <Network variant="body2" sx={{ textAlign: 'right' }}>
                  {data?.cashinDetails.beneficiary}
                </Network>
              </GridRow>
              <GridRow xs={12}>
                <Network variant="body2" sx={{ fontWeight: 'bold' }}>
                  CLABE:
                </Network>
                <Network variant="body2" sx={{ textAlign: 'right' }}>
                  {data?.cashinDetails.clabe}
                </Network>
              </GridRow>
              <GridRow xs={12}>
                <Network variant="body2" sx={{ fontWeight: 'bold' }}>
                  Concepto:
                </Network>
                <Network variant="body2" sx={{ textAlign: 'right' }}>
                  {data?.cashinDetails.concepto}
                </Network>
              </GridRow>
            </Grid>
          )}
        </form>
      </FormContainer>
    );
  }
  return null;
}
