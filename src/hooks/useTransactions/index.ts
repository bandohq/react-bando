import useSWR, { useSWRConfig } from 'swr';

import { getTransactions } from './requests';
import endpoints from '@config/endpoints';
import { useCallback } from 'react';

export default function useTransactions() {
  const { mutate } = useSWRConfig();
  const { data: transactions, ...queryReturn } = useSWR(
    endpoints.transactionHistory,
    getTransactions,
    {
      revalidateOnFocus: false,
    },
  );

  const refetchTransactions = useCallback(() => {
    mutate(endpoints.transactionHistory);
  }, [mutate]);

  return {
    refetchTransactions,
    transactions,
    ...queryReturn,
  };
}
