import ButtonBase, { ButtonProps } from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import { styled, alpha } from '@mui/material/styles';

export const TokensContainer = styled(Grid)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  margin: 0,
  padding: 0,
  fontFamily: 'Kanit',
  '& input.currency-input': {
    border: 'none',
    pointerEvents: 'auto',
    outline: 0,
    backgroundColor: 'transparent',
    fontFamily: 'Kanit',
    fontWeight: 'bold',
    fontSize: theme.typography.pxToRem(24),
    lineHeight: theme.typography.pxToRem(24),
    minHeight: 'auto',
    height: theme.typography.pxToRem(26),
    margin: 0,
    width: '100%',
    color: theme.palette.ink.i950,
    '&.sm': {
      fontSize: theme.typography.pxToRem(16),
      fontWeight: 'normal',
    },
    '&:disabled': {
      pointerEvents: 'none',
    },
    '&::placeholder': {
      color: theme.palette.ink.i950,
    },
  },
  '& input.currency-input.placeholder': {
    '&::placeholder': {
      color: theme.palette.ink.i400,
      fontFamily: 'TWK Everett',
      fontWeight: 'normal',
      fontSize: theme.typography.pxToRem(16),
    },
  },
  '& span.currency-amount': {
    color: theme.palette.ink.i400,
    fontSize: theme.typography.pxToRem(12),
    lineHeight: theme.typography.pxToRem(14),
    '&:empty::before': {
      content: '"-"',
      color: 'transparent',
    },
  },
  '& span.currency-error': {
    color: theme.palette.error.main,
    fontSize: theme.typography.pxToRem(10),
    lineHeight: theme.typography.pxToRem(12),
    padding: theme.spacing(0.5, 0),
  },
  '& span.currency-rate': {
    color: theme.palette.ink.i500,
    fontSize: theme.typography.pxToRem(10),
    marginTop: theme.spacing(1),
    lineHeight: theme.typography.pxToRem(20),
  },
}));

export const CurrencyTokenButton = styled(ButtonBase)<ButtonProps>(({ theme }) => ({
  flexDirection: 'column',
  borderRadius: theme.spacing(1),
  width: '100%',
  boxShadow: 'none',
  textTransform: 'none',
  textAlign: 'left',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  padding: '12px 24px',
  fontSize: '1rem',
  fontFamily: 'Kanit',
  color: theme.palette.ink.i950,
  backgroundColor: theme.palette.ink.i150,
  borderColor: theme.palette.ink.i250,
  borderWidth: '1px',
  borderStyle: 'solid',
  '& p': {
    fontFamily: 'Kanit',
    fontWeight: 'bold',
    fontSize: theme.typography.pxToRem(12),
  },
  '&:hover:not(.MuiButton-text)': {
    backgroundColor: `${alpha(theme.palette.ink.i150, 0.55)}`,
    backgroundImage: 'linear-gradient(rgb(0 0 0/20%) 0 0)',
    boxShadow: 'none',
  },
  '&:disabled': { color: theme.palette.ink.i950 },
  '&.Mui-focusVisible .MuiTouchRipple-root': { display: 'none' },
}));

export const CurrencyAmount = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  gap: theme.spacing(2),
  alignItems: 'center',
  pointerEvents: 'auto',
  '& p': {
    fontFamily: 'TWK Everett',
    lineHeight: 'auto',
    fontSize: theme.typography.pxToRem(24),
    fontWeight: 'bold',
    margin: 0,
  },
}));

export const NetworkBttnsCont = styled(Grid)(({ theme }) => ({
  position: 'sticky',
  marginTop: theme.spacing(1),
  padding: theme.spacing(1, 0),
  display: 'grid',
  gridTemplateColumns: 'repeat(5, auto)',
  gridColumnGap: theme.spacing(2),
  gridRowGap: theme.spacing(1),
  [theme.breakpoints.down('sm')]: {
    gridGap: theme.spacing(1),
  },
}));

export const NetworkButton = styled(ButtonBase)<ButtonProps>(({ theme }) => ({
  aspectRatio: '1/1',
  paddding: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  minWidth: '30px',
  color: theme.palette.ink.i400,
  border: `1px solid ${theme.palette.ink.i200}`,
  borderRadius: theme.spacing(1),
  '&.active': {
    borderColor: theme.palette.primary.main,
  },
  '& span': {
    margin: 'auto',
    borderRadius: '50%',
    overflow: 'hidden',
    width: '100%',
    aspectRatio: '1/1',
    '& img': {
      width: 'auto',
      height: '100%',
      objectFit: 'cover',
    },
  },
  '&:disabled': {
    opacity: '0.7',
  },
}));

export const TokenList = styled('ul')(({ theme }) => ({
  listStyleType: 'none',
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  padding: theme.spacing(0, 2),
  paddingBottom: theme.spacing(2),

  '& li': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    flexDirection: 'row',
    color: theme.palette.ink.i400,
    fontSize: theme.typography.pxToRem(12),
    borderRadius: theme.spacing(1),
    padding: theme.spacing(2, 2),

    '& p': {
      margin: 0,
      color: theme.palette.ink.i950,
      fontSize: theme.typography.pxToRem(18),
    },
    '&:hover': {
      backgroundColor: theme.palette.ink.i150,
      cursor: 'pointer',
    },
    '&.active': {
      border: `1px solid ${alpha(theme.palette.primary.main, 0.75)}`,
      backgroundColor: theme.palette.ink.i150,
    },
  },
}));
