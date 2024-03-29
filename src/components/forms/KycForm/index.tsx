import Grid from '@mui/material/Unstable_Grid2';
import MuiInput from '@components/forms/MuiInput';
import MuiSelect from '@components/forms/MuiSelect';
import MuiPhoneInput from '@components/forms/MuiInput/MuiPhoneInput';
import PlacesAutocomplete from '@components/forms/PlacesAutocomplete';

import ErrorBox from '@components/forms/ErrorBox';
import BandoButton from '@components/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { Title } from '@pages/SignIn';

import { toUpperCase, checkNumberLength } from '@helpers/inputs';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import schema, { KycFormValues } from './schema';
import { AxiosError } from 'axios';

import useKyc from '@hooks/useKyc';
import useUser from '@hooks/useUser';
import { useNavigate } from 'react-router-dom';

import { identificationOptions, Identifications } from '@config/constants/identification';
import { useState } from 'react';
import getStorageQuote from '@helpers/getStorageQuote';

const DEFAULT_PHONE_COUNTRY = 'mx';

type KYCError = { code: string; error: string };

export default function KycForm() {
  const navigate = useNavigate();
  const [kycError, setKycError] = useState({ isError: false, message: '' });
  const [forbiddenError, setForbiddenError] = useState(false);

  const { user } = useUser();
  const { isMutating, postUserKyc } = useKyc();
  const storageQuote = getStorageQuote();
  const { register, control, formState, handleSubmit, setValue } = useForm<KycFormValues>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      phone: '',
      type: 'PERSON',
      document: {
        country: 'MX',
        type: Identifications.NATIONAL_IDENTITY_CARD,
      },
    },
  });

  const onSubmit = async (formValues: KycFormValues) => {
    setKycError({ isError: false, message: '' });

    try {
      await postUserKyc({ ...formValues, email: user?.email as string });
      if (storageQuote.quote?.baseAmount) return navigate('/kyc/ramp', { replace: true });
      return navigate('/', { replace: true });
    } catch (err) {
      const errorObject = err as AxiosError<KYCError>;
      if (errorObject.response?.status === 403) {
        setForbiddenError(true);
        return;
      }

      const errorMsg = errorObject?.response?.data?.error;
      if (errorObject.response?.data.code) {
        const isRfcError = errorMsg?.includes('gov_check_mexico_rfc_error');
        setKycError({
          isError: true,
          message: isRfcError
            ? 'El RFC proporcionado no es válido'
            : errorObject.response?.data.error || 'Unknown error',
        });
        return;
      }
      setKycError({ isError: true, message: 'Ha ocurrido un error.' });
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Title variant="h3">Verifica tus datos</Title>
      <Grid container spacing={1} sx={{ margin: 0 }}>
        <Grid md={6} xs={12}>
          <MuiInput
            label="Nombres"
            type="text"
            sx={{ mt: 2 }}
            InputLabelProps={{ shrink: true }}
            {...register('firstName')}
          />
        </Grid>
        <Grid md={6} xs={12}>
          <MuiInput
            label="Apellidos"
            type="text"
            sx={{ mt: 2 }}
            InputLabelProps={{ shrink: true }}
            {...register('lastName')}
          />
        </Grid>
        <Grid md={12} xs={12}>
          <Controller
            control={control}
            name="phone"
            render={({ field: { onChange, onBlur, value } }) => (
              <MuiPhoneInput
                sx={{ mt: 2 }}
                defaultCountry={DEFAULT_PHONE_COUNTRY}
                label="Número"
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                forceDialCode
              />
            )}
          />
        </Grid>
        <Grid md={12} xs={12}>
          <MuiInput
            label="RFC"
            type="text"
            sx={{ mt: 2 }}
            InputLabelProps={{ shrink: true }}
            {...register('nationalIdNumber', {
              onChange: (e) => {
                toUpperCase(e);
                checkNumberLength(e, 13);
              },
            })}
            error={!!formState.errors.nationalIdNumber?.message}
            helperText={formState.errors.nationalIdNumber?.message}
          />
        </Grid>
        <Grid md={12} xs={12} sx={{ mt: 2 }}>
          <Controller
            control={control}
            name="address.label"
            render={({ field: { onChange, onBlur, value } }) => (
              <PlacesAutocomplete
                label="Dirección"
                noOptionsText="No se encontro la dirección"
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                setInputValue={(val, address) => {
                  setValue('address.label', val);
                  if (address) {
                    setValue('address.street', address.street);
                    setValue('address.city', address.city);
                    setValue('address.zip', address.zip);
                    setValue('address.country', address.country);
                  }
                }}
              />
            )}
          />
        </Grid>
        <Grid md={4} xs={12}>
          <MuiSelect
            sx={{ mt: 2 }}
            defaultValue={Identifications.NATIONAL_IDENTITY_CARD}
            {...register('document.type')}
            items={identificationOptions}
            label="Identificación"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid md={8} xs={12}>
          <MuiInput
            sx={{ mt: 2 }}
            label="Número"
            type="text"
            InputLabelProps={{ shrink: true }}
            {...register('document.number')}
          />
        </Grid>
        {kycError.isError && (
          <Grid md={12} sm={12} xs={12} sx={{ mt: 2 }}>
            <ErrorBox>{kycError.message}</ErrorBox>
          </Grid>
        )}
        {forbiddenError && (
          <Grid md={12} sm={12} xs={12} sx={{ mt: 2 }}>
            <ErrorBox>
              Bando está en beta privado. Para poder ser de nuestros primeros usuarios envía un
              correo a hola@bando.cool
            </ErrorBox>
          </Grid>
        )}
        <Grid md={12} sm={12} xs={12} sx={{ mt: 2 }}>
          <BandoButton type="submit" variant="contained" disabled={isMutating} fullWidth>
            {isMutating && <CircularProgress size={16} sx={{ mr: 1, ml: -2, color: '#fff' }} />}
            Verificar
          </BandoButton>
        </Grid>
      </Grid>
    </form>
  );
}
