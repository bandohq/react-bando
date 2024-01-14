import axios, { AxiosResponse } from 'axios';

type PostAuthenticationRequest = (
  endpoint: string,
  data: { arg: { username: string; password: string } },
) => Promise<AxiosResponse>;
export const postAuthentication: PostAuthenticationRequest = (
  endpoint,
  { arg: { username, password } },
) => axios.post(endpoint, { username, password }).then(({ data }) => data);
