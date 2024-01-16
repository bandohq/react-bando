import axios, { AxiosResponse } from 'axios';
import { RequestQuoteArgs } from '@hooks/useQuote/requests';

export type PostTransactionArgs = RequestQuoteArgs & {
  email: string;
};

// export type Transaction = any;
type PostTransactionRequest = (
  endpoint: string,
  data: { arg: PostTransactionArgs },
) => Promise<AxiosResponse>;
export const postTransaction: PostTransactionRequest = (endpoint, { arg }) =>
  axios.post(endpoint, {
    account_type: 'WALLET_ACCOUNT',
    // email: arg.email,
    cash_in_type: 'SPEI',
    quote: {
      base_amount: String(arg.baseAmount),
      base_currency: arg.baseCurrency,
      quote_currency: String(arg.quoteCurrency),
    },
  });
