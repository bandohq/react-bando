import ButtonBase, { ButtonProps } from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import { styled, alpha } from '@mui/material/styles';

export const TokensContainer = styled(Grid)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  margin: 0,
  padding: 0,
  fontFamily: 'Kanit',
  position: 'relative',
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
    '&::placeholder': {
      color: theme.palette.ink.i950,
    },
    // '&:disabled': { pointerEvents: 'none' },
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
  '&:disabled': { color: theme.palette.ink.i950, pointerEvents: 'none' },
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
