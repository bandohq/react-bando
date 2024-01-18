import { styled } from '@mui/material/styles';

const Hr = styled('hr')(({ theme }) => ({
  backgroundColor: theme.palette.ink.i300,
  height: 1,
  width: '100%',
  border: 0,
}));

export default Hr;
