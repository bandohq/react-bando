import axios from 'axios';

export type PostAuthenticationResponse = {
  refresh: string;
  token: string;
  kycLevel: number;
};
type PostAuthenticationRequest = (
  endpoint: string,
  data: { arg: { username: string; password: string } },
) => Promise<PostAuthenticationResponse>;
export const postAuthentication: PostAuthenticationRequest = (
  endpoint,
  { arg: { username, password } },
) =>
  axios.post(endpoint, { username, password }).then(({ data }) => ({
    refresh: data.refresh,
    token: data.token,
    kycLevel: data.kyc_level,
  }));
