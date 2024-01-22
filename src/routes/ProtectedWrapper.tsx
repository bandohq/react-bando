import { useOutlet, useNavigate, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import useUser from '@hooks/useUser';
import env from '@config/env';

export default function ProtectedWrapper() {
  const outlet = useOutlet();
  const navigate = useNavigate();
  const { user, logoutUser, isUnauthorized } = useUser();

  useEffect(() => {
    try {
      JSON.parse(localStorage.getItem(env.rampDataLocalStorage) ?? '');
    } catch {
      navigate('/', { replace: true });
    }
  }, []);

  useEffect(() => {
    if (user?.email && !user?.kycLevel) navigate('/kyc');
  }, [user, navigate]);

  if (isUnauthorized) {
    logoutUser();
    return <Navigate to="/" replace />;
  }

  return <>{outlet}</>;
}
