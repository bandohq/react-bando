import Box, { BoxProps } from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const H1 = styled(Typography)(({ theme }) => ({
  fontFamily: 'Bueno',
  fontWeight: 'bold',
  lineHeight: 'normal',
  fontSize: '80px !important',
  textTransform: 'uppercase',
  textAlign: 'center',
  color: theme.palette.secondary.main,
  [theme.breakpoints.down('md')]: {
    paddingTop: 0,
    fontSize: '64px !important',
    lineHeight: 'normal',
    paddingBottom: theme.spacing(4),
    paddingLeft: theme.spacing(8),
    paddingRight: theme.spacing(8),
  },
  [theme.breakpoints.down('sm')]: {
    paddingTop: theme.spacing(8),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
}));

export const GridBox = styled(Box)<BoxProps>(({ theme }) => ({
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
    bottom: '18%',
    left: '6%',
    right: 'auto',
  },
  '& img.arrow': {
    width: '360px',
    position: 'absolute',
    top: 'auto',
    bottom: '2%',
    left: 'auto',
    right: '5%',
  },
  '& img.scribble': {
    width: '160px',
    position: 'absolute',
    top: '18%',
    bottom: 'auto',
    left: '10%',
    right: 'auto',
  },
  '& img.cone': {
    width: '108px',
    position: 'absolute',
    top: '20%',
    bottom: 'auto',
    left: 'auto',
    right: '10%',
  },
  [theme.breakpoints.down('lg')]: {
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
  [theme.breakpoints.down('md')]: {
    height: 'auto',
  },
}));

const JumbotronContainer = styled(GridBox)(({ theme }) => ({
  flexDirection: 'column',
  paddingBottom: 6,
  [theme.breakpoints.down('md')]: {
    marginTop: theme.spacing(6),
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(2),
  },
}));

export default function Jumbotron() {
  return (
    <JumbotronContainer>
      <H1 variant="h1">Intercambia entre MXN y cripto en segundos</H1>
      <Typography
        variant="body1"
        sx={{
          fontSize: '20px !important',
          textAlign: 'center',
          maxWidth: '587px',
          margin: '0 auto',
        }}
      >
        Con Bando entra y sal del mundo cripto en segundos con SPEI. Puedes depositar o retirar a tu
        wallet en las redes de Ethereum, Arbitrum, Optimism y muchas más.{' '}
      </Typography>
      <img src="images/Model-Tank.png" loading="lazy" alt="" className="tank" />
      <img src="images/Model-Cone.png" loading="lazy" alt="" className="cone" />
      <img src="images/Vector-2.png" loading="lazy" alt="" className="scribble" />
      <img src="images/2D-Shape.png" loading="lazy" alt="" className="arrow" />
    </JumbotronContainer>
  );
}
