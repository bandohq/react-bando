import BoxContainer from '@components/BoxContainer';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import BandoButton from '@components/Button';
import Input from '@components/forms/Input';
import Select from '@components/forms/Select';
import useUser from '@hooks/useUser';

import { sendCurrency, depositCurrency } from '@config/constants/currencies';
import env from '@config/env';
import { Quote } from '@hooks/useQuote/requests';

export default function RampForm() {
  const { user } = useUser();
  const quote = JSON.parse(localStorage.getItem(env.rampDataLocalStorage) ?? '') as Quote;
  console.log({ quote });

  if (user && quote) {
    return (
      <BoxContainer sx={{ width: '100%', maxWidth: '600px' }}>
        <Grid container spacing={2} sx={{ margin: 0 }}>
          <Grid xs={12}>
            <Typography variant="body1">Confirma</Typography>
          </Grid>
        </Grid>

        <Grid
          container
          spacing={2}
          sx={{
            margin: 0,
            border: '1px solid #E6E7E9',
            borderRadius: '12px',
            padding: 2,
          }}
        >
          <Grid md={4} sm={6} xs={7}>
            <Select
              className="rounded"
              items={sendCurrency}
              value={quote.baseCurrency}
              mantainLabel={false}
            />
          </Grid>
          <Grid md={8} sm={6} xs={5}>
            sad
          </Grid>
          <Grid md={4} sm={6} xs={7}>
            <Select
              value={quote.quoteCurrency}
              className="rounded"
              items={depositCurrency}
              mantainLabel={false}
            />
          </Grid>
          <Grid md={8} sm={6} xs={5}>
            sad
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ margin: 0 }}>
          <Grid xs={12}>
            <Input
              label="Recibes en esta red"
              type="text"
              name="quoteAmount"
              value={user?.publicAddress}
            />
          </Grid>

          <Grid xs={12}>
            <BandoButton
              type="submit"
              variant="contained"
              fullWidth
              sx={{ padding: '16px 8px', fontWeight: 'bold' }}
            >
              Confirmar
            </BandoButton>
          </Grid>
        </Grid>
      </BoxContainer>
    );
  }
  return null;
}
