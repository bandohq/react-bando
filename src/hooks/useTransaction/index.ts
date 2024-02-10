import useSWRMutation from 'swr/mutation';
import useSWR, { useSWRConfig } from 'swr';

import { postTransaction, getTransaction } from './requests';
import endpoints from '@config/endpoints';

type UseTransactionArgs = {
  transactionId?: string;
};

export default function useTransaction({ transactionId = '' }: UseTransactionArgs) {
  console.log({ transactionId });
  const { mutate } = useSWRConfig();

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

  const refetchTransaction = () => mutate(`${endpoints.transaction}${transactionId}/`);

  return {
    transaction,
    refetchTransaction,
    isLoading,
    postTransaction: trigger,
    isMutating,
    data,
    error,
  };
}
