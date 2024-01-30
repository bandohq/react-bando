import { useContext, useEffect, useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import Cookies from 'js-cookie';
import env from '@config/env';

import { User, UserContext } from './MagicUserProvider';
import { getUserData } from './requests';
import endpoints from '@config/endpoints';

export default function useUser() {
  const {
    user,
    isLoading: isMagicLoading,
    logoutUser: logout,
    setUser,
    resetUser,
  } = useContext(UserContext);
  const [isLoginOut, setIsLoginOut] = useState<boolean>(false);
  const { mutate } = useSWRConfig();
  const { data, isLoading } = useSWR(endpoints.userKyc, getUserData, { revalidateOnFocus: false });

  const logoutUser = async () => {
    setIsLoginOut(true);
    try {
      await logout();

      localStorage.removeItem(env.rampDataLocalStorage);
      Cookies.remove(env.authCookieName);
      resetUser();
    } finally {
      setIsLoginOut(false);
    }
  };

  const refetchUser = () => mutate(endpoints.userKyc);

  useEffect(() => {
    const rsp = (typeof data === 'object' ? data : {}) as unknown as User;
    setUser(rsp);
  }, [data, setUser]);

  return {
    user,
    isLoginOut,
    logoutUser,
    refetchUser,
    userEmail: user?.email,
    isLoading: isMagicLoading || isLoading,
    isSessionValid: !!data,
    isUnauthorized: !isLoading && !data,
  };
}
