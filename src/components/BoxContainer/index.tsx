import Box, { BoxProps } from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const BoxContainer = styled(Box)<BoxProps>(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.primary.contrastText,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  borderRadius: theme.spacing(1),
  boxShadow: '0 4px  4px rgb(0 0 0 / 25%)',
}));

export default BoxContainer;
