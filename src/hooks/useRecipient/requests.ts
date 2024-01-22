import axios, { AxiosResponse } from 'axios';

export type PostRecipientArgs = {
  asset: string;
  email: string;
  walletName?: string;
  address: string;
  network?: string;
};

type PostRecipientRequest = (
  endpoint: string,
  data: { arg: PostRecipientArgs },
) => Promise<AxiosResponse>;
export const postRecipient: PostRecipientRequest = (endpoint, { arg }) =>
  axios.post(endpoint, {
    account_type: 'WALLET_ACCOUNT',
    data: {
      asset: arg.asset,
      network: (arg.network ?? 'arbitrum').toUpperCase(),
      wallet_name: arg.walletName ?? 'test',
      address: arg.address,
    },
  });
