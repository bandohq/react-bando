import axios from 'axios';
import { RequestQuoteArgs } from '@hooks/useQuote/requests';

export type OperationType = 'deposit' | 'withdraw';
export type PostTransactionArgs = RequestQuoteArgs & {
  accountAddress: string;
  accountNetwork: string;
  operationType: OperationType;
  cashinChain?: string;
};

export type WithDrawCashinDetailsArgs = {
  network: string;
  address: string;
  Bank: never;
  Beneficiary: never;
  CLABE: never;
  concepto: never;
};

export type DepositCashinDetailsArgs = {
  address: never;
  network: string;
  Bank: string;
  Beneficiary: string;
  CLABE: string;
  concepto: string;
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
  cashinDetails: WithDrawCashinDetailsArgs | DepositCashinDetailsArgs;
};

type PostTransactionRequest = (
  endpoint: string,
  data: { arg: PostTransactionArgs },
) => Promise<Transaction>;

export const postTransaction: PostTransactionRequest = (endpoint, { arg }) =>
  axios
    .post(endpoint, {
      account_type: arg.operationType === 'deposit' ? 'WALLET_ACCOUNT' : 'SPEI',
      account_network: arg.operationType === 'deposit' ? String(arg.accountNetwork) : 'SPEI',
      cash_in_type: arg.operationType === 'deposit' ? 'SPEI' : 'WALLET_ACCOUNT',
      account_address: String(arg.accountAddress),
      quote: {
        base_amount: String(arg.baseAmount),
        base_currency: arg.baseCurrency,
        quote_currency: String(arg.quoteCurrency),
      },
      cash_in_chain: arg.cashinChain?.toUpperCase() || null,
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
      cashinDetails: data.cash_in_details,
    }));
