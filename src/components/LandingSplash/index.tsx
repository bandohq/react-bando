import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import Box, { BoxProps } from '@mui/material/Box';
import BoxContainer from '@components/BoxContainer';
import BandoButton from '@components/Button';
import Input from '@components/forms/Input';
import Select from '@components/forms/Select';
import Currency from '../../assets/currency.svg';
import Usdt from '../../assets/usdt.svg';
import Arbitrum from '../../assets/arbitrum.svg';

const ContainerBox = styled(Box)<BoxProps>(({ theme }) => ({
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
  [theme.breakpoints.down('sm')]: {
    marginTop: '72px',
  },
}));

const GridBox = styled(Box)<BoxProps>(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  position: 'relative',
  height: '100vh',
  width: '100%',
  justifySelf: 'center',
  justifyContent: 'center',
  alignItems: 'center',
  '& img.tank': {
    width: '108px',
    position: 'absolute',
    top: 'auto',
    bottom: '32%',
    left: '6%',
    right: 'auto',
  },
  '& img.arrow': {
    width: '360px',
    position: 'absolute',
    top: 'auto',
    bottom: '15%',
    left: 'auto',
    right: '25%',
  },
  '& img.scribble': {
    width: '160px',
    position: 'absolute',
    top: '30%',
    bottom: 'auto',
    left: '24%',
    right: 'auto',
  },
  '& img.cone': {
    width: '108px',
    position: 'absolute',
    top: '25%',
    bottom: 'auto',
    left: 'auto',
    right: '13%',
  },
  [theme.breakpoints.down('sm')]: {
    height: 'auto',
    '& img.tank': {
      display: 'none',
    },
    '& img.arrow': {
      display: 'none',
    },
    '& img.scribble': {
      display: 'none',
    },
    '& img.cone': {
      display: 'none',
    },
  },
}));

const CurrencyImg = styled('img')(({ theme }) => ({
  marginTop: '-10px',
  marginBottom: '-10px',
  padding: 0,
  marginRight: theme.spacing(1),
  width: 37,
  height: 37,
}));

const H1 = styled(Typography)(({ theme }) => ({
  fontFamily: 'DM Sans',
  fontWeight: 'bold',
  fontSize: '40px !important',
  textTransform: 'uppercase',
  color: theme.palette.primary.main,
  [theme.breakpoints.down('sm')]: {
    paddingTop: theme.spacing(8),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
}));

const BoxTitle = styled(Typography)(({ theme }) => ({
  fontWeight: '500',
  fontSize: '1.5rem !important',
  color: theme.palette.ink.i900,
}));

export default function LandingSplash() {
  return (
    <ContainerBox>
      <Grid container spacing={2}>
        <Grid md={6} xs={12}>
          <GridBox>
            <H1 variant="h1">TU Lugar SEGURO, SENCILLO Y ENTENDIBLE EN LA WEB3</H1>
            <img src="images/Model-Tank.png" loading="lazy" alt="" className="tank" />
            <img src="images/Model-Cone.png" loading="lazy" alt="" className="cone" />
            <img src="images/Vector-2.png" loading="lazy" alt="" className="scribble" />
            <img src="images/2D-Shape.png" loading="lazy" alt="" className="arrow" />
          </GridBox>
        </Grid>
        <Grid md={6} xs={12}>
          <GridBox>
            <BoxContainer sx={{ width: '100%', maxWidth: '600px' }}>
              <Grid container spacing={2} sx={{ margin: 0 }}>
                <Grid xs={12}>
                  <BoxTitle variant="h3">Deposita MXN</BoxTitle>
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
    </ContainerBox>
  );
}
