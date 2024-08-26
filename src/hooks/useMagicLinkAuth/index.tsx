import { useState } from 'react';
import useSWRMutation from 'swr/mutation';
import useMagic from '@hooks/useMagic';

import Cookies from 'js-cookie';
import endpoints from '@config/endpoints';
import { postAuthentication } from './requests';
import env from '@config/env';

export default function useMagicLinkAuth() {
  const [isAuthenticatingMagicLink, setIsAuthenticatingMagicLink] = useState(false);
  const { magic } = useMagic();
  const { trigger, isMutating, data, error } = useSWRMutation(
    endpoints.postAuth,
    postAuthentication,
  );

  const login = async ({ email = '' }) => {
    setIsAuthenticatingMagicLink(true);
    try {
      if (magic) {
        const did = await magic.auth.loginWithEmailOTP({ email, showUI: true });
        const userInfo = await magic.user.getInfo();

        const rsp = await trigger({ username: userInfo.email ?? '', password: did ?? '' });
        Cookies.set(env.authCookieName, rsp.token, { domain: window.location.hostname });
        localStorage.setItem('bnd', userInfo.email ?? '');
        return rsp;
      }
    } finally {
      setIsAuthenticatingMagicLink(false);
    }
  };

  return {
    magic,
    login,
    data,
    error,
    isMutating: isMutating || isAuthenticatingMagicLink,
  };
}
