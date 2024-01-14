import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import ExposedLayout from '@layouts/ExposedLayout';
import Typography from '@mui/material/Typography';

import MuiInput from '@components/forms/MuiInput';
import BandoButton from '@components/Button';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RequestQuoteArgs } from '@hooks/useQuote/requests';
import schema, { SignInFormValues } from './schema';

import useMagicLinkAuth from '@hooks/useMagicLinkAuth';

export const Title = styled(Typography)(({ theme }) => ({
  fontSize: '32px !important',
  fontFamily: 'DM Sans',
  fontWeight: 700,
  color: theme.palette.ink.i600,
  marginBottom: theme.spacing(2),
}));

export default function SignIn() {
  const { login } = useMagicLinkAuth();
  const { register, handleSubmit } = useForm<SignInFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: SignInFormValues) => {
    console.log(data);
    const dataRsp = await login(data);
    console.log({ dataRsp });
  };

  return (
    <ExposedLayout
      leftContent={
        <form onSubmit={handleSubmit(onSubmit)}>
          <Title variant="h3">Verifica tus datos</Title>
          <MuiInput
            label="Email"
            type="email"
            sx={{ my: 2 }}
            mantainLabel={false}
            InputLabelProps={{ shrink: true }}
            {...register('email')}
          />

          <BandoButton
            type="submit"
            variant="contained"
            fullWidth
            sx={{ padding: '16px 8px', fontWeight: 'bold', mt: 3 }}
          >
            Verificar
          </BandoButton>
        </form>
      }
      rightContent={'right content'}
    />
  );
}
