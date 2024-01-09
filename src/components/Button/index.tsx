import ButtonBase, { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const BandoButton = styled(ButtonBase)<ButtonProps>(({ theme }) => ({
  borderRadius: theme.spacing(1),
  boxShadow: 'none',
  textTransform: 'none',
  padding: '12px 24px',
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  fontFamily: 'TWK Everett',
  fontWeight: 'normal',
  '&.rounded': { borderRadius: '24px' },
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    backgroundImage: 'linear-gradient(rgb(0 0 0/20%) 0 0)',
    boxShadow: 'none',
  },
}));

export default BandoButton;
