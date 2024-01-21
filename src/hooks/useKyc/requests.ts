import axios, { AxiosResponse } from 'axios';
import env from '@config/env';

type GetPlacesRequest = (endpoint: string, data: { arg: string }) => Promise<AxiosResponse>;
export const getPlacesRequest: GetPlacesRequest = (endpoint, { arg: input }) =>
  axios.get(endpoint, {
    params: { input, key: env.googleMapsApiKey },
    baseURL: 'https://maps.googleapis.com',
    withCredentials: false,
    headers: { Authorization: undefined },
  });
