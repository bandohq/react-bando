import axios from 'axios';
import { RequestQuoteArgs } from '@hooks/useQuote/requests';

export type OperationType = 'deposit' | 'withdraw';
export type PostTransactionArgs = RequestQuoteArgs & {
  accountAddress: string;
  accountNetwork: string;
  operationType: OperationType;
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
  networkConfig?: {
    name: string;
    chainId: string;
    key: string;
  };
};

type PostTransactionRequest = (
  endpoint: string,
  data: { arg: PostTransactionArgs },
) => Promise<Transaction>;

type GetTransactionRequest = (endpoint: string, data: { arg: string }) => Promise<Transaction>;

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
        network: String(arg.accountNetwork),
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
      cashinDetails: data.cash_in_details,
      ...(data.network_config && {
        networkConfig: {
          name: data.network_config.name,
          chainId: data.network_config.chain_id,
          key: data.network_config.key,
        },
      }),
    }));

export const getTransaction: GetTransactionRequest = (endpoint) =>
  axios.get(endpoint).then(({ data }) => ({
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
    ...(data.network_config && {
      networkConfig: {
        name: String(data.network_config.name).toUpperCase(),
        chainId: data.network_config.chain_id,
        key: data.network_config.key,
      },
    }),
  }));
