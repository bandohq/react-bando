import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import schema, { ConfirmRampFormValues } from './schema';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

import Grid from '@mui/material/Unstable_Grid2';
import CircularProgress from '@mui/material/CircularProgress';

import BandoButton from '@components/Button';
import Input from '@components/forms/Input';
import ErrorBox from '@components/forms/ErrorBox';
import TransactionDetail from '@components/TransactionDetails';

import useUser from '@hooks/useUser';
import useRecipient from '@hooks/useRecipient';
import useTransaction from '@hooks/useTransaction';
import getStorageQuote, { deleteStorageQuote } from '@helpers/getStorageQuote';

import { checkNumberLength, allowOnlyNumbers } from '@helpers/inputs';
import { Quote } from '@hooks/useQuote/requests';
import { Transaction } from '@hooks/useTransaction/requests';

type RampFormProps = {
  noContainer?: boolean;
};

export default function RampForm({ noContainer = false }: Readonly<RampFormProps>) {
  const [recipientError, setRecipientError] = useState(false);
  const [forbiddenError, setForbiddenError] = useState(false);
  const { quote, network = '', operationType: opType } = getStorageQuote();
  const navigate = useNavigate();

  const { user } = useUser();
  const { postRecipient, isMutating: isRecipientMutating } = useRecipient();
  const { data, postTransaction, isMutating: isTransactionMutation } = useTransaction({});
  const isLoading = isRecipientMutating || isTransactionMutation;

  const { register, handleSubmit, formState, watch, setValue } = useForm<ConfirmRampFormValues>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      address: '',
    },
  });

  const operationType = watch('operationType');

  const onSubmit = async (formValues: ConfirmRampFormValues) => {
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
        operationType: formValues?.operationType ?? '',
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

    const txn = await postTransaction({
      ...(quote as Quote),
      accountAddress:
        (formValues?.operationType === 'deposit' ? formValues?.address : formValues.clabe) ?? '',
      accountNetwork: network ?? '',
      operationType: formValues?.operationType ?? '',
    });
    deleteStorageQuote();
    navigate(`/transaction/${txn?.transactionId}`);
  };

  useEffect(() => {
    if (opType) setValue('operationType', opType);
  }, [opType, setValue]);

  if (user && quote) {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <TransactionDetail
          transaction={data || (quote as unknown as Transaction)}
          noContainer={noContainer}
          quoteRateInverse={quote?.quoteRateInverse}
          quoteRate={quote?.quoteRate}
          network={network ?? ''}
          success={false}
          operationType={operationType}
        >
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
                    error={!!formState.errors.clabe?.message}
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
                  Bando está en beta privado. Para poder ser de nuestros primeros usuarios envía un
                  correo a hola@bando.cool
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
        </TransactionDetail>
      </form>
    );
  }
  return null;
}
