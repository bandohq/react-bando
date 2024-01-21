import ColumnLayout from '@layouts/ColumnLayout';
import Grid from '@mui/material/Unstable_Grid2';
import MuiInput from '@components/forms/MuiInput';
import BandoButton from '@components/Button';
import CircularProgress from '@mui/material/CircularProgress';

import { MuiPhone } from '@components/forms/MuiInput/TelephoneInput';
import { toUpperCase, checkNumberLength } from '@helpers/inputs';

import usePlaceAutocomplete from '@hooks/usePlaceAutocomplete';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import schema, { KycFormValues } from './schema';

import { Title } from '@pages/SignIn';

const DEFAULT_PHONE_COUNTRY = 'mx';
export default function Kyc() {
  // const { data, isLoading } =
  usePlaceAutocomplete({ input: 'Barlovento Residencial' });
  const { register, control, formState, handleSubmit } = useForm<KycFormValues>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      phone: '',
    },
  });

  return (
    <ColumnLayout
      leftContent={
        <form onSubmit={handleSubmit((arg) => console.log(arg))}>
          <Title variant="h3">Verifica tus datos</Title>
          <Grid container spacing={1} sx={{ margin: 0 }}>
            <Grid md={6}>
              <MuiInput
                label="Nombres"
                type="text"
                sx={{ my: 2 }}
                mantainLabel={false}
                InputLabelProps={{ shrink: true }}
                {...register('firstName')}
              />
            </Grid>
            <Grid md={6}>
              <MuiInput
                label="Apellidos"
                type="text"
                sx={{ my: 2 }}
                mantainLabel={false}
                InputLabelProps={{ shrink: true }}
                {...register('lastName')}
              />
            </Grid>
            <Grid md={12}>
              <Controller
                control={control}
                name="phone"
                render={({ field: { onChange, onBlur, value } }) => (
                  <MuiPhone
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
            <Grid md={12}>
              <MuiInput
                label="RFC"
                type="text"
                sx={{ my: 2 }}
                mantainLabel={false}
                InputLabelProps={{ shrink: true }}
                {...register('rfc', {
                  onChange: (e) => {
                    toUpperCase(e);
                    checkNumberLength(e, 13);
                  },
                })}
                error={!!formState.errors.rfc?.message}
                helperText={formState.errors.rfc?.message}
              />
            </Grid>
            <Grid md={12}>
              <MuiInput
                label="Dirección"
                type="text"
                sx={{ my: 2 }}
                mantainLabel={false}
                InputLabelProps={{ shrink: true }}
                {...register('address')}
              />
            </Grid>
            <Grid md={12}>
              <BandoButton
                type="submit"
                variant="contained"
                fullWidth
                sx={{ padding: '16px 8px', fontWeight: 'bold', mt: 3 }}
              >
                {false && <CircularProgress size={16} sx={{ mr: 1, ml: -2, color: '#fff' }} />}
                Verificar
              </BandoButton>
            </Grid>
          </Grid>
        </form>
      }
    />
  );
}
