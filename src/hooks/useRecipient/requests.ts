import axios, { AxiosResponse } from 'axios';

export type PostRecipientArgs = {
  asset: string;
  email: string;
  walletName?: string;
  network?: string;
  address?: string;
  firstName?: string;
  lastName?: string;
  operationType: string;
  clabe?: string;
};

type PostRecipientRequest = (
  endpoint: string,
  data: { arg: PostRecipientArgs },
) => Promise<AxiosResponse>;
export const postRecipient: PostRecipientRequest = (endpoint, { arg }) => {
  const payload =
    arg.operationType === 'deposit'
      ? {
          account_type: 'WALLET_ACCOUNT',
          asset: arg.asset,
          network: (arg.network ?? 'polygon').toUpperCase(),
          data: {
            address: arg.address,
            wallet_name: arg.walletName ?? 'test',
          },
        }
      : {
          account_type: 'SPEI',
          asset: 'MXN',
          network: 'SPEI',
          data: {
            address: arg.clabe,
            first_name: arg.firstName,
            last_name: arg.lastName,
          },
        };

  return axios.post(endpoint, payload);
};
