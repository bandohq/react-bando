import useSWRMutation from 'swr/mutation';

import { postTransaction } from './requests';
import endpoints from '@config/endpoints';

export default function useTransaction() {
  const { trigger, isMutating, data, error } = useSWRMutation(
    endpoints.postTransaction,
    postTransaction,
  );

  return {
    postTransaction: trigger,
    isMutating,
    data,
    error,
  };
}
