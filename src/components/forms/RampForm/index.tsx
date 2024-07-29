import { useEffect, useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';
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
import { tapfiliateConversion } from '@config/tapfiliate';

import { checkNumberLength, allowOnlyNumbers } from '@helpers/inputs';
import { Quote } from '@hooks/useQuote/requests';
import { Transaction } from '@hooks/useTransaction/requests';

type RampFormProps = {
  noContainer?: boolean;
};

export default function RampForm({ noContainer = false }: Readonly<RampFormProps>) {
  const { t } = useTranslation('ramp');
  const { quote, operationType: opType, networkObj, tokenObj } = getStorageQuote();

  const [formError, setFormError] = useState<string>('');
  const [limitAlert, setLimitAlert] = useState<boolean>(false);
  const navigate = useNavigate();

  const { user } = useUser();
  const { postRecipient, isMutating: isRecipientMutating } = useRecipient();
  const { data, postTransaction, isMutating: isTransactionMutation } = useTransaction({});
  const isLoading = isRecipientMutating || isTransactionMutation;

  const { register, handleSubmit, formState, watch, setValue } = useForm<ConfirmRampFormValues>({
    resolver: yupResolver(schema(networkObj?.key ?? '')),
    mode: 'onBlur',
    defaultValues: {
      address: '',
    },
  });

  const getErrorMessage = (status?: number) => {
    switch (status) {
      case 403:
        return 'errors.forbidden';
      case 406:
        return 'errors.accountNames';
      default:
        return 'errors.recipient';
    }
  };

  const operationType = watch('operationType');

  const onSubmit = async (formValues: ConfirmRampFormValues) => {
    setFormError('');

    try {
      await postRecipient({
        network: networkObj?.key ?? '',
        email: user?.email ?? '',
        asset: quote?.quoteCurrency ?? '',
        address: formValues?.address ?? '',
        firstName: formValues?.firstName ?? '',
        lastName: formValues?.lastName ?? '',
        operationType: formValues?.operationType ?? '',
        clabe: formValues?.clabe ?? '',
      });
    } catch (err) {
      setLimitAlert(false);
      setFormError(t(getErrorMessage((err as AxiosError).response?.status)));
      return;
    }

    try {
      const txn = await postTransaction({
        ...(quote as Quote),
        accountAddress:
          (formValues?.operationType === 'deposit' ? formValues?.address : formValues.clabe) ?? '',
        accountNetwork: networkObj?.key ?? '',
        operationType: formValues?.operationType ?? '',
      });

      // TODO: This most likely does not belong here, we need to figure out how to
      // send the conversition event on completed txn
      // tapfiliateConversion(txn.id, txn.quoteAmount, {
      //   baseCurrency: txn.baseCurrency,
      //   quoteCurrency: txn.quoteCurrency,
      // });
      deleteStorageQuote();
      navigate(`/transactions/${txn?.transactionId}`);
    } catch (err) {
      if ((err as AxiosError).response?.status === 403) {
        setFormError('');
        setLimitAlert(true);
        return;
      }
      setLimitAlert(false);
      setFormError(t('errors.txn'));
      return;
    }
  };

  useEffect(() => {
    if (opType) setValue('operationType', opType);
  }, [opType, setValue]);

  if (user && quote) {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <TransactionDetail
          transaction={data ?? (quote as unknown as Transaction)}
          noContainer={noContainer}
          quoteRateInverse={quote?.quoteRateInverse}
          quoteRate={quote?.quoteRate}
          networkObj={networkObj}
          tokenObj={tokenObj}
          success={false}
          operationType={operationType}
        >
          <Grid container spacing={2} sx={{ mx: 0, my: 1 }}>
            {operationType === 'deposit' ? (
              <Grid xs={12}>
                <Input
                  label={t('address')}
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
                    label={t('name')}
                    type="text"
                    {...register('firstName')}
                    error={!!formState.errors.firstName?.message}
                  />
                </Grid>
                <Grid md={6}>
                  <Input
                    label={t('lastName')}
                    type="text"
                    {...register('lastName')}
                    error={!!formState.errors.lastName?.message}
                  />
                </Grid>
                <Grid xs={12}>
                  <Input
                    label={t('clabe')}
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
            {!!formError && (
              <Grid xs={12}>
                <ErrorBox>{formError}</ErrorBox>
              </Grid>
            )}
            {!!limitAlert && (
              <Grid xs={12}>
                <ErrorBox mode="alert" align="left">
                  <Trans
                    t={t}
                    i18nKey="errors.limit"
                    components={{
                      strong: <strong />,
                      p: <p />,
                      h4: <h4 />,
                      ol: <ol />,
                      li: <li />,
                      h6: <h6 />,
                      br: <br />,
                    }}
                  />
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
                {t('confirm')}
              </BandoButton>
            </Grid>
          </Grid>
        </TransactionDetail>
      </form>
    );
  }
  return null;
}
