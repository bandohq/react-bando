import { useContext, useEffect } from 'react';
import useSWR from 'swr';

import { User, UserContext } from './MagicUserProvider';
import { getUserData } from './requests';
import endpoints from '@config/endpoints';

export default function useUser() {
  const { user, isLoading: isMagicLoading, logoutUser, setUser } = useContext(UserContext);
  const { data, isLoading } = useSWR(endpoints.getUser, getUserData);
  // console.log({ data });

  useEffect(() => {
    const rsp = (typeof data === 'object' ? data : {}) as unknown as User;
    // console.log({ rsp });
    setUser(rsp);
  }, [data, setUser]);

  return {
    user,
    logoutUser,
    userEmail: user?.email,
    isLoading: isMagicLoading || isLoading,
    isSessionValid: !!data,
    isUnauthorized: !isLoading && !data,
  };
}
