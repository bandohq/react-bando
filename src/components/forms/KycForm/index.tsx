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

import useKyc from '@hooks/useKyc';
import useUser from '@hooks/useUser';
import { useNavigate } from 'react-router-dom';

import { identificationOptions, Identifications } from '@config/constants/identification';
import { useState } from 'react';
import getStorageQuote from '@helpers/getStorageQuote';

const DEFAULT_PHONE_COUNTRY = 'mx';
export default function KycForm() {
  const navigate = useNavigate();
  const [error, setError] = useState(false);

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
    try {
      await postUserKyc({ ...formValues, email: user?.email as string });
      if (storageQuote.quote?.baseAmount) return navigate('/kyc/ramp', { replace: true });
      return navigate('/', { replace: true });
    } catch {
      setError(true);
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
        {error && (
          <Grid md={12} sx={{ mt: 2 }}>
            <ErrorBox>Ha ocurrido un error.</ErrorBox>
          </Grid>
        )}
        <Grid md={12} sx={{ mt: 2 }}>
          <BandoButton type="submit" variant="contained" disabled={isMutating} fullWidth>
            {isMutating && <CircularProgress size={16} sx={{ mr: 1, ml: -2, color: '#fff' }} />}
            Verificar
          </BandoButton>
        </Grid>
      </Grid>
    </form>
  );
}
