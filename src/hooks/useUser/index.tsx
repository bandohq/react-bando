import { useContext } from 'react';
import useSWR from 'swr';

import { UserContext } from './MagicUserProvider';
import { getUserData } from './requests';
import endpoints from '@config/endpoints';

export default function useUser() {
  const { user, isLoading: isMagicLoading, logoutUser } = useContext(UserContext);
  const { data, isLoading } = useSWR(endpoints.getUser, getUserData);

  return {
    logoutUser,
    userEmail: user?.email,
    isLoading: isMagicLoading || isLoading,
    isSessionValid: !!data,
    isUnauthorized: !isLoading && !data,
  };
}
