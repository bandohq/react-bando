import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import Cross from '../../../assets/Cross.svg';
import Button from '@mui/material/Button';

import env from '@config/env';
import { ReactNode } from 'react';

export const CircularButton = styled(Button)(() => ({
  borderRadius: '50%',
  aspectRatio: '1/1',
  width: 'fit-content',
  minWidth: 'fit-content',
}));

type RampTitleProps = {
  title?: string;
  success?: boolean;
  subtitle?: string;
  noArrow?: boolean;
  leftContent?: ReactNode;
};
export default function RampTitle({
  leftContent,
  title = '',
  success = false,
  subtitle = '',
  noArrow = false,
}: RampTitleProps) {
  const navigate = useNavigate();

  const closeRamp = () => {
    localStorage.removeItem(env.rampDataLocalStorage);
    navigate('/');
  };

  return (
    <>
      <Grid
        xs={12}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          justifyItems: 'center',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="body1"
          sx={{
            fontSize: '27px !important',
            fontFamily: 'Kanit',
            fontWeight: '500',
            mb: 1,
          }}
        >
          {title || (success ? 'Transacción en proceso' : 'Confirma')}
        </Typography>
        {!noArrow && (
          <CircularButton onClick={closeRamp}>
            <img src={Cross} alt="" width={16} height={16} />
          </CircularButton>
        )}
        {leftContent}
      </Grid>

      {subtitle && (
        <Grid xs={12}>
          <Typography variant="body2" sx={{ fontSize: '13px !important', color: 'ink.i600' }}>
            {subtitle}
          </Typography>
        </Grid>
      )}
    </>
  );
}
