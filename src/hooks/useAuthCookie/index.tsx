import Cookies from 'js-cookie';
import env from '@config/env.ts';

export default function useAuthCookie() {
  const token = Cookies.get(env.authCookieName);

  return { token, isAuthenticated: !!token };
}
