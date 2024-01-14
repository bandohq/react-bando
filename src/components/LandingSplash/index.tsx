import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';

import Jumbotron, { GridBox } from './Jumbotron';

import GetQuoteForm from '@components/forms/GetQuoteForm';

const Container = styled('section')(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  height: '100vh',
  width: '100%',
  maxWidth: theme.breakpoints.values.xl,
  justifySelf: 'center',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '0 auto',
  paddingBottom: '84px',
  '& .MuiGrid2-container': { width: '100%' },
}));

export default function LandingSplash() {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid md={6} xs={12}>
          <Jumbotron />
        </Grid>
        <Grid md={6} xs={12}>
          <GridBox>
            <GetQuoteForm />
          </GridBox>
        </Grid>
      </Grid>
    </Container>
  );
}
