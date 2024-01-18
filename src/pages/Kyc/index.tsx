import ColumnLayout from '@layouts/ColumnLayout';
import Grid from '@mui/material/Unstable_Grid2';
import MuiInput from '@components/forms/MuiInput';
import BandoButton from '@components/Button';
import CircularProgress from '@mui/material/CircularProgress';

import { Title } from '@pages/SignIn';

export default function Kyc() {
  return (
    <ColumnLayout
      leftContent={
        <>
          <Title variant="h3">Verifica tus datos</Title>
          <Grid container spacing={1} sx={{ margin: 0 }}>
            <Grid md={6}>
              <MuiInput
                label="Nombres"
                type="text"
                sx={{ my: 2 }}
                mantainLabel={false}
                InputLabelProps={{ shrink: true }}
                // {...register('email')}
              />
            </Grid>
            <Grid md={6}>
              <MuiInput
                label="Apellidos"
                type="text"
                sx={{ my: 2 }}
                mantainLabel={false}
                InputLabelProps={{ shrink: true }}
                // {...register('email')}
              />
            </Grid>
            <Grid md={12}>
              <MuiInput
                label="Télefono"
                type="text"
                sx={{ my: 2 }}
                mantainLabel={false}
                InputLabelProps={{ shrink: true }}
                // {...register('email')}
              />
            </Grid>
            <Grid md={12}>
              <MuiInput
                label="Dirección"
                type="text"
                sx={{ my: 2 }}
                mantainLabel={false}
                InputLabelProps={{ shrink: true }}
                // {...register('email')}
              />
            </Grid>
            <Grid md={12}>
              <MuiInput
                label="Número"
                type="text"
                sx={{ my: 2 }}
                mantainLabel={false}
                InputLabelProps={{ shrink: true }}
                // {...register('email')}
              />
            </Grid>
            <Grid md={12}>
              <BandoButton
                type="submit"
                variant="contained"
                // disabled={isMutating}
                fullWidth
                sx={{ padding: '16px 8px', fontWeight: 'bold', mt: 3 }}
              >
                {false && <CircularProgress size={16} sx={{ mr: 1, ml: -2, color: '#fff' }} />}
                Verificar
              </BandoButton>
            </Grid>
          </Grid>
        </>
      }
    />
  );
}
