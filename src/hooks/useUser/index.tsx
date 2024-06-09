import { useEffect, useState, useMemo } from 'react';
// import useSWR, { useSWRConfig } from 'swr';
import { queryClient } from '@config/queryClient';
import { minutesToMilliseconds } from 'date-fns';

import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import env from '@config/env';

import { User, useMagicUser } from './MagicUserProvider';
import { getUserData } from './requests';

const QUERY_KEY = 'user';

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

  const {
    data,
    isLoading: isUserLoading,
    refetch,
    ...queryReturn
  } = useQuery({
    queryKey: [QUERY_KEY],
    queryFn: async () => {
      console.log('useQuery - getUserData');
      if (!user) await fetchMagicUser();
      return getUserData();
    },
    retry: false,
    gcTime: minutesToMilliseconds(5),
    staleTime: Infinity,
  });

  const isLoading = useMemo(() => isMagicLoading || isUserLoading, [isMagicLoading, isUserLoading]);
  const isUnauthorized = useMemo(() => !isLoading && !data, [isLoading, data]);

  const removeSessionStorage = async () => {
    console.log('we here');
    setIsLoginOut(true);
    try {
      await logoutUser();
      localStorage.removeItem(env.rampDataLocalStorage);
      Cookies.remove(env.authCookieName, { domain: window.location.hostname });
      resetUser();
    } catch (err) {
      console.log({ err });
      //
    } finally {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      setIsLoginOut(false);
    }
  };

  // useEffect(() => {
  //   if (data?.email) {
  //     const rsp = (typeof data === 'object' ? data : {}) as unknown as User;
  //     setUser(rsp);
  //   }
  // }, [data, setUser]);

  console.log({ ...user, ...data });

  return {
    user: { ...user, ...data },
    setUser,
    resetUser,
    fetchMagicUser,
    isLoginOut,
    logoutUser,
    removeSessionStorage,
    refetchUser: refetch,
    userEmail: user?.email,
    ...queryReturn,
    isLoading,
    isSessionValid: !!data,
    isUnauthorized,
  };
}
