import Box, { BoxProps } from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const H1 = styled(Typography)(({ theme }) => ({
  fontFamily: 'DM Sans',
  fontWeight: 'bold',
  fontSize: '40px !important',
  textTransform: 'uppercase',
  color: theme.palette.primary.main,
  [theme.breakpoints.down('md')]: {
    paddingTop: 0,
    paddingBottom: theme.spacing(4),
    paddingLeft: theme.spacing(8),
    paddingRight: theme.spacing(8),
    textAlign: 'center',
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
  [theme.breakpoints.down('md')]: {
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

export default function Jumbotron() {
  return (
    <GridBox>
      <H1 variant="h1">TU Lugar SEGURO, SENCILLO Y ENTENDIBLE EN LA WEB3</H1>
      <img src="images/Model-Tank.png" loading="lazy" alt="" className="tank" />
      <img src="images/Model-Cone.png" loading="lazy" alt="" className="cone" />
      <img src="images/Vector-2.png" loading="lazy" alt="" className="scribble" />
      <img src="images/2D-Shape.png" loading="lazy" alt="" className="arrow" />
    </GridBox>
  );
}
