import axios, { AxiosResponse } from 'axios';

export type PostRecipientArgs = {
  asset: string;
  email: string;
  walletName?: string;
  network?: string;
  address?: string;
  firstName?: string;
  lastName?: string;
  clabe?: string;
};

type PostRecipientRequest = (
  endpoint: string,
  data: { arg: PostRecipientArgs },
) => Promise<AxiosResponse>;
export const postRecipient: PostRecipientRequest = (endpoint, { arg }) => {
  const payload = arg.address
    ? {
        account_type: 'WALLET_ACCOUNT',
        data: {
          asset: arg.asset,
          network: (arg.network ?? 'arbitrum').toUpperCase(),
          wallet_name: arg.walletName ?? 'test',
          address: arg.address,
        },
      }
    : {
        account_type: 'SPEI',
        data: {
          clabe: arg.clabe,
          first_name: arg.firstName,
          last_name: arg.lastName,
        },
      };

  return axios.post(endpoint, payload);
};
