import { useState, useCallback, useMemo } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import Cookies from 'js-cookie';
import env from '@config/env';

import { useMagicUser } from './MagicUserProvider';
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
    onSuccess: (rsp) => {
      if (rsp?.email) {
        setUser(rsp);
      }
    },
    onError: () => {
      removeSessionStorage();
    },
  });
  const isLoading = useMemo(() => isMagicLoading || isUserLoading, [isMagicLoading, isUserLoading]);
  const isUnauthorized = useMemo(() => !isLoading && !user, [isLoading, user]);

  const refetchUser = useCallback(() => {
    mutate(endpoints.userKyc);
  }, [mutate]);

  const removeSessionStorage = useCallback(async () => {
    setIsLoginOut(true);
    try {
      await logoutUser();
      localStorage.removeItem(env.rampDataLocalStorage);
      Cookies.remove(env.authCookieName);
      resetUser();
      setIsLoginOut(false);
    } catch (err) {
      setIsLoginOut(false);
    }
  }, [logoutUser, resetUser]);

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
    isMagicLoading,
    isSessionValid: !!data,
    isUnauthorized,
  };
}
