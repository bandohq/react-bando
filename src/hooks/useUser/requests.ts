import axios, { AxiosResponse } from 'axios';

type GetUserDataRequest = (endpoint: string) => Promise<string | AxiosResponse>;
export const getUserData: GetUserDataRequest = (endpoint) =>
  axios.get(endpoint).catch((error) => {
    if (error.response.data.success) return Promise.resolve('auth valid');
    throw new Error('auth invalid');
  });
