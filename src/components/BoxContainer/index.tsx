import Box, { BoxProps } from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const BoxContainer = styled(Box)<BoxProps>(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.primary.contrastText,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  borderRadius: theme.spacing(2),
}));

export default BoxContainer;
