import Box, { BoxProps } from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { useTranslation, Trans } from 'react-i18next';

const H1 = styled(Typography)(({ theme }) => ({
  zIndex: '1',
  fontFamily: 'Bueno',
  fontWeight: 'bold',
  lineHeight: 'normal',
  fontSize: '70px !important',
  textTransform: 'uppercase',
  color: theme.palette.secondary.main,
  [theme.breakpoints.down('md')]: {
    paddingTop: 0,
    fontSize: '64px !important',
    lineHeight: 'normal',
    textAlign: 'center',
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(8),
    paddingRight: theme.spacing(8),
  },
  [theme.breakpoints.down('sm')]: {
    textAlign: 'center',
    fontSize: '51px !important',
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
}));

const P = styled(Typography)(({ theme }) => ({
  fontFamily: 'Kanit',
  zIndex: '1',
  fontSize: '20px !important',
  color: theme.palette.ink.i600,
  [theme.breakpoints.down('md')]: {
    fontSize: '16px !important',
    textAlign: 'center',
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(8),
    paddingRight: theme.spacing(8),
  },
  [theme.breakpoints.down('sm')]: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
}));

export const GridBox = styled(Box)<BoxProps>(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  position: 'relative',
  height: 'auto',
  minHeight: '100vh',
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
    minHeight: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const JumbotronContainer = styled(GridBox)(({ theme }) => ({
  flexDirection: 'column',
  margin: '0 auto',
  [theme.breakpoints.down('md')]: {
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(2),
  },
}));

export default function MobileJumbotron() {
  const { t } = useTranslation('landing');

  return (
    <JumbotronContainer>
      <H1 variant="h1">{t('mainTitle')}</H1>
      <P>
        <Trans t={t} i18nKey="subtitle" components={{ separator: <br /> }} />
      </P>
    </JumbotronContainer>
  );
}
