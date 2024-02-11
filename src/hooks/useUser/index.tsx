import { useEffect, useState, useCallback, useMemo } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import Cookies from 'js-cookie';
import env from '@config/env';

import { User, useMagicUser } from './MagicUserProvider';
import { getUserData } from './requests';
import endpoints from '@config/endpoints';

export default function useUser() {
  const { user, isLoading: isMagicLoading, logoutUser, setUser, resetUser } = useMagicUser();
  const [isLoginOut, setIsLoginOut] = useState<boolean>(false);
  const { mutate } = useSWRConfig();
  const { data, isLoading: isUserLoading } = useSWR(endpoints.userKyc, getUserData, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });

  const isLoading = useMemo(() => isMagicLoading || isUserLoading, [isMagicLoading, isUserLoading]);
  const isUnauthorized = useMemo(() => !isLoading && !data, [isLoading, data]);

  const removeSessionStorage = useCallback(async () => {
    setIsLoginOut(true);
    try {
      await removeSessionStorage();
      localStorage.removeItem(env.rampDataLocalStorage);
      Cookies.remove(env.authCookieName);
      resetUser();
    } catch (err) {
      //
    } finally {
      setIsLoginOut(false);
    }
  }, []);

  const refetchUser = () => mutate(endpoints.userKyc);

  useEffect(() => {
    const rsp = (typeof data === 'object' ? data : {}) as unknown as User;
    setUser(rsp);
  }, [data, setUser]);

  return {
    user,
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
