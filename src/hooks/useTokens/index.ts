import useSWR, { useSWRConfig } from 'swr';

import { getTokens } from './requests';
import endpoints from '@config/endpoints';
import { useCallback } from 'react';

export default function useTokens({ chainKey = '' }) {
  const { mutate } = useSWRConfig();
  const { data, ...queryReturn } = useSWR(`${endpoints.tokens}${chainKey}/`, getTokens, {
    revalidateOnFocus: false,
  });

  const refetchTokens = useCallback(() => {
    mutate(`${endpoints.tokens}${chainKey}`);
  }, [mutate, chainKey]);

  return {
    refetchTokens,
    data,
    tokens: data?.tokens,
    totalPageTokens: data?.tokens?.length ?? 0,
    ...queryReturn,
  };
}
