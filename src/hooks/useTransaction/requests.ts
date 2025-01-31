import axios from 'axios';
import { RequestQuoteArgs } from '@hooks/useQuote/requests';

export const OPERATION_TYPES = ['deposit', 'withdraw'] as const;
export type OperationType = (typeof OPERATION_TYPES)[number];
export type PostTransactionArgs = RequestQuoteArgs & {
  accountAddress: string;
  accountNetwork: string;
  operationType: OperationType;
};

export type WithDrawCashinDetailsArgs = {
  network: string;
  address: string;
  bank: never;
  beneficiary: never;
  clabe: never;
  concepto: never;
};

export type DepositCashinDetailsArgs = {
  address: never;
  network: string;
  bank: string;
  beneficiary: string;
  clabe: string;
  concepto: string;
  clabeType: string;
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
  cashinDetails?: WithDrawCashinDetailsArgs | DepositCashinDetailsArgs;
  quoteRateInverse?: number;
  networkConfig?: {
    name: string;
    chainId: string;
    key: string;
    imageUrl: string;
  };
  asset?: {
    symbol: string;
    address: string;
    decimals: number;
    imageUrl: string;
  };
  commission?: {
    amountUSD: number;
    currency: string;
  };
  createdAt?: string;
  updatedAt?: string;
  operationType?: string;
  recipient?: string;
};

export type TransactionRequest = Record<string, unknown> & {
  cash_in_details: WithDrawCashinDetailsArgs | DepositCashinDetailsArgs;
  network_config?: Record<string, unknown>;
  asset?: Record<string, unknown>;
  commission?: Record<string, unknown>;
};

export const mapTransactionData = (data: TransactionRequest): Transaction =>
  ({
    id: data.id,
    transactionId: data.transaction_id,
    status: data.status,
    baseAmount: parseFloat(data.base_amount as string),
    quoteAmount: parseFloat(data.quote_amount as string),
    baseCurrency: data.base_currency,
    quoteCurrency: data.quote_currency,
    rate: parseFloat(data.rate as string),
    fee: parseFloat(data.fee as string),
    cashInNetwork: data.cash_in_network,
    endNetwork: data.end_network,
    operationType: data.direction === 'ON' ? 'deposit' : 'withdraw',
    providerStatus: data.provider_status,
    cashinDetails: data.cash_in_details,
    quoteRateInverse: parseFloat(data.rate as string),
    ...(data.network_config && {
      networkConfig: {
        name: String(data.network_config.name).toUpperCase(),
        chainId: data.network_config.chain_id,
        key: data.network_config.key,
        imageUrl: data.network_config.image,
      },
    }),
    ...(data.asset && {
      asset: {
        name: String(data.asset.symbol).toUpperCase(),
        address: data.asset.address,
        decimals: data.asset.decimals,
        imageUrl: data.asset.image,
      },
    }),
    ...(data.commission && {
      commission: {
        amountUSD: parseFloat(data.commission.quote_amount_usd as string),
        currency: data.commission.quote_currency,
      },
    }),
    recipient: data.recipient,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  }) as Transaction;

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
        network: String(arg.accountNetwork),
      },
    })
    .then(({ data }) => mapTransactionData(data));

type GetTransactionRequest = (endpoint: string, data: { arg: string }) => Promise<Transaction>;
export const getTransaction: GetTransactionRequest = (endpoint) =>
  axios.get(endpoint).then(({ data }) => mapTransactionData(data));
