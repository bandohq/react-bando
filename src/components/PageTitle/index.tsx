import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const PageTitle = styled(Typography)(({ theme }) => ({
  fontSize: '25px !important',
  fontFamily: 'Kanit',
  fontWeight: 700,
  color: theme.palette.ink.i600,
  marginBottom: theme.spacing(2),
}));

export default PageTitle;
