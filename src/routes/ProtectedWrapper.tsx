import { useOutlet, useNavigate } from 'react-router-dom';
import useUser from '@hooks/useUser';
import { useEffect } from 'react';
import SiteSpinner from '@components/SiteSpinner';

export default function ProtectedWrapper() {
  const outlet = useOutlet();
  const navigate = useNavigate();
  const { isUnauthorized, isLoading } = useUser();

  useEffect(() => {
    if (isUnauthorized && !isLoading) {
      navigate('/signin', { replace: true });
    }
  }, [isUnauthorized, isLoading, navigate]);

  if (isLoading) {
    return <SiteSpinner />;
  }

  return <>{outlet}</>;
}
