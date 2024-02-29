import { useEffect, useState, useCallback, useMemo } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import Cookies from 'js-cookie';
import env from '@config/env';

import { User, useMagicUser } from './MagicUserProvider';
import { getUserData } from './requests';
import endpoints from '@config/endpoints';

export default function useUser() {
  const {
    user,
    isLoading: isMagicLoading,
    logoutUser,
    setUser,
    resetUser,
    fetchUser: fetchMagicUser,
  } = useMagicUser();
  const [isLoginOut, setIsLoginOut] = useState<boolean>(false);
  const { mutate } = useSWRConfig();
  const { data, isLoading: isUserLoading } = useSWR(endpoints.userKyc, getUserData, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });

  const isLoading = useMemo(() => isMagicLoading || isUserLoading, [isMagicLoading, isUserLoading]);
  const isUnauthorized = useMemo(() => !isLoading && !data, [isLoading, data]);

  const refetchUser = useCallback(() => {
    mutate(endpoints.userKyc);
  }, [mutate]);

  const removeSessionStorage = async () => {
    setIsLoginOut(true);
    try {
      await logoutUser();
      localStorage.removeItem(env.rampDataLocalStorage);
      Cookies.remove(env.authCookieName);
      resetUser();
    } catch (err) {
      //
    } finally {
      setIsLoginOut(false);
    }
  };

  useEffect(() => {
    if (data?.email) {
      const rsp = (typeof data === 'object' ? data : {}) as unknown as User;
      setUser(rsp);
    }
  }, [data, setUser]);

  return {
    user,
    setUser,
    resetUser,
    fetchMagicUser,
    isLoginOut,
    logoutUser,
    removeSessionStorage,
    refetchUser,
    userEmail: user?.email,
    isLoading,
    isSessionValid: !!data,
    isUnauthorized,
  };
}
