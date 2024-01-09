import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';
import BoxContainer from '@components/BoxContainer';
import Jumbotron, { GridBox } from './Jumbotron';
import BandoButton from '@components/Button';
import Input from '@components/forms/Input';
import Select from '@components/forms/Select';
import Currency from '../../assets/currency.svg';
import Usdt from '../../assets/usdt.svg';
import Arbitrum from '../../assets/arbitrum.svg';

const Hr = styled('hr')(({ theme }) => ({
  backgroundColor: theme.palette.ink.i300,
  height: 1,
  width: '100%',
  border: 0,
}));

const LandingContainer = styled('section')(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  height: '100vh',
  width: '100%',
  maxWidth: theme.breakpoints.values.xl,
  justifySelf: 'center',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '0 auto',
  paddingBottom: '84px',
  '& .MuiGrid2-container': { width: '100%' },
}));

const CurrencyImg = styled('img')(({ theme }) => ({
  marginTop: '-10px',
  marginBottom: '-10px',
  padding: 0,
  marginRight: theme.spacing(1),
  width: 37,
  height: 37,
}));

export default function LandingSplash() {
  return (
    <LandingContainer>
      <Grid container spacing={2}>
        <Grid md={6} xs={12}>
          <Jumbotron />
        </Grid>
        <Grid md={6} xs={12}>
          <GridBox>
            <BoxContainer sx={{ width: '100%', maxWidth: '600px' }}>
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
                  <Input label="Envias" type="number" />
                </Grid>
                <Grid md={4} sm={6} xs={5}>
                  <Select
                    defaultValue={'mxn'}
                    items={[
                      {
                        label: 'MXN',
                        value: 'mxn',
                        startComponent: <CurrencyImg src={Currency} />,
                      },
                      {
                        label: 'USD',
                        value: 'usd',
                        startComponent: <CurrencyImg src={Currency} />,
                      },
                    ]}
                  />
                </Grid>
                <Grid md={8} sm={6} xs={7}>
                  <Input
                    label="Recibes"
                    type="number"
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
                    defaultValue={'usdt'}
                    items={[
                      {
                        label: 'USDT',
                        value: 'usdt',
                        startComponent: <CurrencyImg src={Usdt} />,
                      },
                    ]}
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
                    variant="contained"
                    fullWidth
                    sx={{ padding: '16px 8px', fontWeight: 'bold' }}
                  >
                    Depositar
                  </BandoButton>
                </Grid>
              </Grid>
            </BoxContainer>
          </GridBox>
        </Grid>
      </Grid>
    </LandingContainer>
  );
}
