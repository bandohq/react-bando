import useSWR, { useSWRConfig } from 'swr';
import { useCallback, useEffect, useState } from 'react';
// import { createFilterOptions } from '@mui/material/Autocomplete';
import { matchSorter } from 'match-sorter';

import { getTokens, Token } from './requests';
import endpoints from '@config/endpoints';

const TOKEN_QUERYSTR = '/?all=true';

export default function useTokens({ chainKey = '' }) {
  const { mutate } = useSWRConfig();
  const [tokens, setTokens] = useState<Token[]>([]);

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

  const resetTokens = () => !!data?.tokens && setTokens(data.tokens);

  const filterTokens = useCallback(
    (search: string) => {
      if (data?.tokens) {
        const sort = matchSorter(data?.tokens, search, { keys: ['key', 'name'] });
        setTokens(sort);
        return sort;
      }
    },
    [data],
  );

  useEffect(() => {
    if (data?.tokens) {
      console.log('SET TOKENS');
      setTokens(data.tokens);
    }
  }, [data]);

  return {
    refetchTokens,
    data,
    // tokens: data?.tokens,
    tokens,
    resetTokens,
    filterTokens,
    totalTokens: data?.tokens?.length ?? 0,
    ...queryReturn,
  };
}
