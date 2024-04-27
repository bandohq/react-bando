import useSWR, { useSWRConfig } from 'swr';
import { useCallback } from 'react';

import { getTokens } from './requests';
import endpoints from '@config/endpoints';

const TOKEN_QUERYSTR = '/?all=true';

export default function useTokens({ chainKey = '' }) {
  const { mutate } = useSWRConfig();
  const { data, ...queryReturn } = useSWR(
    `${endpoints.tokens}${chainKey}${TOKEN_QUERYSTR}`,
    chainKey ? getTokens : null,
    {
      revalidateOnFocus: false,
    },
  );

  const refetchTokens = useCallback(() => {
    mutate(`${endpoints.tokens}${chainKey}${TOKEN_QUERYSTR}`);
  }, [mutate, chainKey]);

  return {
    refetchTokens,
    data,
    tokens: data?.tokens,
    totalTokens: data?.tokens?.length ?? 0,
    ...queryReturn,
  };
}
