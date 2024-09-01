import EmptyLayout from '@layouts/EmptyLayout';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import MuiInput from '@components/forms/MuiInput';
import BoxContainer from '@components/BoxContainer';
import BandoButton from '@components/Button';
import PageTitle from '@components/PageTitle';
import CircularProgress from '@mui/material/CircularProgress';
import getStorageQuote from '@helpers/getStorageQuote';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import schema, { SignInFormValues } from '../SignIn/schema';
import { Link } from 'react-router-dom';
import useMagicLinkAuth from '@hooks/useMagicLinkAuth';
import useUser from '@hooks/useUser';
import { styled } from '@mui/material';

const BottomLink = styled(Link)(({ theme }) => ({
  textAlign: 'center',
  marginTop: '10px',
  fontSize: '16px',
  color: theme.palette.primary.main,
}));

export default function SignUp() {
  const navigate = useNavigate();
  const storageQuote = getStorageQuote();
  const { t } = useTranslation('form');

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
        if (storageQuote.quote?.baseAmount) return navigate('/ramp');
        return navigate('/');
      }
      return navigate('/start');
    } catch {
      // TODO: handle error
    }
  };

  return (
    <EmptyLayout>
      <BoxContainer sx={{ maxWidth: { md: '60vw' }, width: { md: '30vw' }, m: '0 auto' }}>
        <form onSubmit={handleSubmit(onSubmit)} style={{ padding: '40px 20px 40px 20px' }}>
          <PageTitle variant="h3" sx={{ textAlign: 'center' }}>
            {t('signup.title')}
          </PageTitle>
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
            {t('signup.button')}
          </BandoButton>
        </form>
      </BoxContainer>
      <BottomLink to={'/signin'}>{t('signup.footer')}</BottomLink>
    </EmptyLayout>
  );
}
