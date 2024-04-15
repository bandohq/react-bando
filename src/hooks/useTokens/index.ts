import useSWR, { useSWRConfig } from 'swr';

import { getTokens } from './requests';
import endpoints from '@config/endpoints';
import { useCallback } from 'react';

export default function useTokens({ chainKey = '' }) {
  const { mutate } = useSWRConfig();
  const { data: tokens, ...queryReturn } = useSWR(`${endpoints.tokens}${chainKey}/`, getTokens, {
    revalidateOnFocus: false,
  });

  const refetchTokens = useCallback(() => {
    mutate(`${endpoints.tokens}${chainKey}`);
  }, [mutate, chainKey]);

  return {
    refetchTokens,
    tokens,
    ...queryReturn,
  };
}
