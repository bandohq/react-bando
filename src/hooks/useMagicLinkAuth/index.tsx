import { magic } from '@config/magicLink';
import useSWRMutation from 'swr/mutation';
import endpoints from '@config/endpoints';
import { postAuthentication } from './requests';

export default function useMagicLinkAuth() {
  const { trigger, isMutating, data, error } = useSWRMutation(
    endpoints.postAuth,
    postAuthentication,
  );

  const login = async ({ email = '' }) => {
    try {
      if (magic) {
        const did = await magic.auth.loginWithEmailOTP({ email, showUI: true });
        console.log(`DID Token: ${did}`);
        const userInfo = await magic.user.getInfo();
        console.log(`UserInfo: ${userInfo.email}`);

        const rsp = await trigger({ username: userInfo.email ?? '', password: did ?? '' });
        console.log({ rsp });
      }
    } catch {
      // Handle errors if required!
    }
  };

  return { login, isMutating, data, error };
}
