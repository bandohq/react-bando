import axios from 'axios';
import { RequestQuoteArgs } from '@hooks/useQuote/requests';

export type PostTransactionArgs = RequestQuoteArgs & {
  accountAddress: string;
  accountNetwork: string;
};

export type Transaction = {
  id: number;
  transactionId: string;
  status: string;
  baseAmount: number;
  quoteAmount: number;
  baseCurrency: string;
  quoteCurrency: string;
  rate: number;
  fee: number;
  cashInNetwork: string;
  endNetwork: string;
  providerStatus: string;
  cashinDetails: {
    network: string;
    bank: string;
    beneficiary: string;
    clabe: string;
    concepto: string;
  };
};

type PostTransactionRequest = (
  endpoint: string,
  data: { arg: PostTransactionArgs },
) => Promise<Transaction>;
export const postTransaction: PostTransactionRequest = (endpoint, { arg }) =>
  axios
    .post(endpoint, {
      account_type: 'WALLET_ACCOUNT',
      account_address: String(arg.accountAddress),
      account_network: String(arg.accountNetwork),
      cash_in_type: 'SPEI',
      quote: {
        base_amount: String(arg.baseAmount),
        base_currency: arg.baseCurrency,
        quote_currency: String(arg.quoteCurrency),
      },
    })
    .then(({ data }) => ({
      id: data.id,
      transactionId: data.transaction_id,
      status: data.status,
      baseAmount: parseFloat(data.base_amount),
      quoteAmount: parseFloat(data.quote_amount),
      baseCurrency: data.base_currency,
      quoteCurrency: data.quote_currency,
      rate: parseFloat(data.rate),
      fee: parseFloat(data.fee),
      cashInNetwork: data.cash_in_network,
      endNetwork: data.end_network,
      providerStatus: data.provider_status,
      cashinDetails: {
        network: data.cashin_details.network,
        bank: data.cashin_details.Bank,
        beneficiary: data.cashin_details.Beneficiary,
        clabe: data.cashin_details.CLABE,
        concepto: data.cashin_details.concepto,
      },
    }));
