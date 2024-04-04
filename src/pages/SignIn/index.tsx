import ColumnLayout from '@layouts/ColumnLayout';
import { useNavigate } from 'react-router-dom';

import MuiInput from '@components/forms/MuiInput';
import BandoButton from '@components/Button';
import PageTitle from '@components/PageTitle';
import CircularProgress from '@mui/material/CircularProgress';
import KycBulletPoints from '@components/KycBulletPoints';
import getStorageQuote from '@helpers/getStorageQuote';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import schema, { SignInFormValues } from './schema';

import useMagicLinkAuth from '@hooks/useMagicLinkAuth';
import useUser from '@hooks/useUser';

export default function SignIn() {
  const navigate = useNavigate();
  const storageQuote = getStorageQuote();

  const { login, isMutating } = useMagicLinkAuth();
  const { refetchUser, fetchMagicUser } = useUser();

  const { register, handleSubmit } = useForm<SignInFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: SignInFormValues) => {
    try {
      const rsp = await login(data);
      await fetchMagicUser();
      await Promise.all([refetchUser(), fetchMagicUser()]);
      if ((rsp?.kycLevel ?? 0) > 0) {
        if (storageQuote.quote?.baseAmount) return navigate('/kyc/ramp');
        return navigate('/');
      }
      return navigate('/kyc');
    } catch {
      // TODO: handle error
    }
  };

  return (
    <ColumnLayout
      leftContent={
        <form onSubmit={handleSubmit(onSubmit)}>
          <PageTitle variant="h3">Verifica tu correo</PageTitle>
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
            disabled={isMutating}
            fullWidth
            sx={{ padding: '16px 8px', fontWeight: 'bold', mt: 3 }}
          >
            {isMutating && <CircularProgress size={16} sx={{ mr: 1, ml: -2, color: '#fff' }} />}
            Verificar
          </BandoButton>
        </form>
      }
      rightContent={<KycBulletPoints />}
    />
  );
}
