import axios from 'axios';

type GetTokensRequest = (endpoint: string) => Promise<any>;

export const getTokens: GetTokensRequest = (endpoint) =>
  axios.get(endpoint).then(({ data }) => {
    console.log({ data });
    return data;
  });
