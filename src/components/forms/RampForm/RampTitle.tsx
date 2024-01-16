import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { useNavigate } from 'react-router-dom';
import env from '@config/env';
import Cross from '../../../assets/Cross.svg';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

export const CircularButton = styled(Button)(() => ({
  borderRadius: '50%',
  aspectRatio: '1/1',
  width: 'fit-content',
  minWidth: 'fit-content',
}));

export default function RampTitle({ success = false }) {
  const navigate = useNavigate();

  const closeRamp = () => {
    localStorage.removeItem(env.rampDataLocalStorage);
    navigate('/');
  };

  return (
    <Grid
      xs={12}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Typography
        variant="body1"
        sx={{
          fontSize: '24px !important',
          fontFamily: 'DM Sans',
          mb: 1,
        }}
      >
        {success ? 'Transacción exitosa' : 'Confirma'}
      </Typography>

      <CircularButton onClick={closeRamp}>
        <img src={Cross} alt="" width={16} height={16} />
      </CircularButton>
    </Grid>
  );
}
