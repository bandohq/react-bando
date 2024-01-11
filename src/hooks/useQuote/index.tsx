import useSWRMutation from 'swr/mutation';

import { getQuoteRequest } from './requests';
import endpoints from '@config/endpoints';

export default function useQuote() {
  const { trigger, isMutating, data, error } = useSWRMutation(endpoints.getQuote, getQuoteRequest);

  return {
    getQuote: trigger,
    isMutating,
    data,
    error,
  };
}
