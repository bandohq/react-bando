import { useOutlet, Navigate } from 'react-router-dom';
import useUser from '@hooks/useUser';

export default function ProtectedWrapper() {
  const outlet = useOutlet();
  const { logoutUser, isUnauthorized } = useUser();

  if (isUnauthorized) {
    logoutUser();
    return <Navigate to="/signin" replace />;
  }

  return <>{outlet}</>;
}
