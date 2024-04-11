import ButtonBase, { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const BandoButton = styled(ButtonBase)<ButtonProps>(({ theme }) => ({
  borderRadius: theme.spacing(1),
  boxShadow: 'none',
  textTransform: 'none',
  padding: '12px 24px',
  fontSize: '1rem',
  lineHeight: '1.25rem',
  fontFamily: 'Kanit',
  fontWeight: 'bold',
  '&.rounded': { borderRadius: '24px' },
  '&:hover:not(.MuiButton-text)': {
    backgroundColor: theme.palette.primary.main,
    backgroundImage: 'linear-gradient(rgb(0 0 0/20%) 0 0)',
    boxShadow: 'none',
  },
  '&.MuiButton-sizeSmall': {
    padding: '10px 18px',
  },
}));

export default BandoButton;
