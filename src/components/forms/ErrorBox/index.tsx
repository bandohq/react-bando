import Box, { BoxProps } from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const ErrorBox = styled(Box)<BoxProps>(({ theme }) => ({
  padding: theme.spacing(2),
  marginTop: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  borderRadius: '6px',
  color: theme.palette.error.main,
  backgroundColor: theme.palette.error.contrastText,
  border: `1px solid ${theme.palette.error.main}`,
  textAlign: 'center',
}));

export default ErrorBox;
