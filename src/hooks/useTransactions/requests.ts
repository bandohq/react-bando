import axios from 'axios';
import {
  mapTransactionData,
  Transaction,
  TransactionRequest,
} from '@hooks/useTransaction/requests';

type GroupedTransactions = {
  [key: string]: Transaction[];
};
type GetTransactionsRequest = (endpoint: string) => Promise<GroupedTransactions>;

export const getTransactions: GetTransactionsRequest = (endpoint) =>
  axios.get(endpoint).then(({ data }) => {
    const parsedData: GroupedTransactions = Object.keys(data).reduce(
      (acc: GroupedTransactions, key) => {
        acc[key] = data[key]?.map((transaction: TransactionRequest) =>
          mapTransactionData(transaction),
        );
        return acc;
      },
      {},
    );
    return parsedData;
  });
