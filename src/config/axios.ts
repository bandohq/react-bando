import axios, { AxiosHeaders } from 'axios';
import Cookies from 'js-cookie';
import env from '@config/env.ts';

axios.defaults.baseURL = env.api;
axios.interceptors.request.use((config) => {
  const token = Cookies.get(env.authCookieName);

  if (token) {
    config.headers = {
      Authorization: `Bearer ${token}`,
      ...config.headers,
    } as unknown as AxiosHeaders;
  }

  return config;
});

axios.interceptors.response.use(
  (response) => {
    // Added this interceptor to avoid using data key multiple times in response.
    if (response.data.data) {
      response.data = response.data.data;
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      Cookies.remove(env.authCookieName);
    }

    return Promise.reject(error);
  },
);
