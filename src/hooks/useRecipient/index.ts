import useSWRMutation from 'swr/mutation';

import { postRecipient } from './requests';
import endpoints from '@config/endpoints';

export default function useRecipient() {
  const { trigger, isMutating, data, error } = useSWRMutation(
    endpoints.postRecipient,
    postRecipient,
  );

  return {
    postRecipient: trigger,
    isMutating,
    data,
    error,
  };
}
