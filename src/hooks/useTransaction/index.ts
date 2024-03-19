import useSWRMutation from 'swr/mutation';
import useSWR, { useSWRConfig } from 'swr';
import { secondsToMilliseconds } from 'date-fns';

import { postTransaction, getTransaction } from './requests';
import endpoints from '@config/endpoints';
import { useCallback, useEffect, useRef } from 'react';

type SetInterval = ReturnType<typeof setInterval>;

type UseTransactionArgs = {
  transactionId?: string;
};

const TRANSACTION_CHECK_INTERVAL_SECS = 20;

export default function useTransaction({ transactionId = '' }: UseTransactionArgs) {
  const { mutate } = useSWRConfig();
  const timerRef = useRef<SetInterval | number>(0);
  const statusCheckInterval = secondsToMilliseconds(TRANSACTION_CHECK_INTERVAL_SECS);

  const { trigger, isMutating, data, error } = useSWRMutation(
    endpoints.transaction,
    postTransaction,
  );

  const { data: transaction, isLoading } = useSWR(
    `${endpoints.transaction}${transactionId}/`,
    transactionId ? getTransaction : null,
    {
      revalidateOnFocus: false,
    },
  );

  const refetchTransaction = useCallback(() => {
    mutate(`${endpoints.transaction}${transactionId}/`);
  }, [mutate, transactionId]);

  const transactionStatus = transaction?.providerStatus ?? '';
  const isTransactionInProgress = ![
    'COMPLETED',
    'FAILED',
    'EXPIRED',
    'REJECTED',
    'CANCELED',
  ].includes(transactionStatus);

  // Effect will refetch transaction every TRANSACTION_CHECK_INTERVAL_SECS seconds
  // until status is either completed or failed
  useEffect(() => {
    if (isTransactionInProgress) {
      timerRef.current = setInterval(() => {
        refetchTransaction();
      }, statusCheckInterval);
    }

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [isTransactionInProgress, statusCheckInterval, refetchTransaction]);

  return {
    transaction,
    refetchTransaction,
    isLoading,
    postTransaction: trigger,
    isMutating,
    isTransactionInProgress,
    data,
    error,
  };
}
