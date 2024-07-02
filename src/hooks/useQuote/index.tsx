import useSWRMutation from 'swr/mutation';
import { useEffect, useState } from 'react';

import { getQuoteRequest, Quote } from './requests';
import endpoints from '@config/endpoints';

export default function useQuote() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const { trigger, isMutating, data, error } = useSWRMutation(endpoints.getQuote, getQuoteRequest);

  const resetQuote = () => setQuote(null);

  useEffect(() => {
    if (data) {
      setQuote(data);
    }
  }, [data]);

  return {
    quote,
    resetQuote,
    getQuote: trigger,
    isMutating,
    data,
    error,
  };
}
