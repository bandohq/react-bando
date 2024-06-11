import { useOutlet, useNavigate } from 'react-router-dom';
import useUser from '@hooks/useUser';
import { useEffect } from 'react';
import SiteSpinner from '@components/SiteSpinner';

export default function OnlyGuestWrapper() {
  const outlet = useOutlet();
  const navigate = useNavigate();
  const { isUnauthorized, isLoading } = useUser();

  useEffect(() => {
    if (!isLoading && !isUnauthorized) {
      navigate('/', { replace: true });
    }
  }, [isUnauthorized, navigate, isLoading]);

  if (isLoading) {
    return <SiteSpinner />;
  }

  return <>{outlet}</>;
}
