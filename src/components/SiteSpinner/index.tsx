import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const SiteSpinnerContainer = styled(Box)(() => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'stretch',
  margin: 'auto',
}));

export default function SiteSpinner() {
  return (
    <SiteSpinnerContainer>
      <CircularProgress size={32} />
    </SiteSpinnerContainer>
  );
}
