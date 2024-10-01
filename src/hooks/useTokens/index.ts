import useSWR, { useSWRConfig } from 'swr';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { matchSorter } from 'match-sorter';

import { getTokens, Token } from './requests';
import endpoints from '@config/endpoints';
import { OperationType } from '@hooks/useTransaction/requests';

const TOKEN_QUERYSTR = '/?all=true';

type UseTokensArgs = {
  chainKey?: string;
  operationType?: OperationType;
};

export default function useTokens({ chainKey = '', operationType }: UseTokensArgs) {
  const { mutate } = useSWRConfig();

  const [rspTokens, setRspTokens] = useState<Token[]>([]);
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

  const resetTokens = () =>
    !!data?.tokens && setTokens(data.tokens.filter((token) => !!token.symbol));

  const filteredTokensByOperationType = useMemo(
    () =>
      operationType == 'deposit'
        ? data?.tokens?.filter((token) => token?.isOnrampActive && !!token.symbol)
        : data?.tokens?.filter((token) => token?.isOfframpActive && !!token.symbol),
    [data, operationType],
  );

  const filterTokens = useCallback(
    (search: string) => {
      if (!search && rspTokens.length) {
        setTokens(rspTokens);
        return;
      }
      if (rspTokens) {
        const sort = matchSorter(rspTokens, search, { keys: ['key', 'name'] });
        setTokens(sort);
        return sort;
      }
    },
    [rspTokens],
  );

  useEffect(() => {
    if (filteredTokensByOperationType) {
      setTokens(filteredTokensByOperationType);
      setRspTokens(filteredTokensByOperationType);
    }
  }, [filteredTokensByOperationType]);

  return {
    refetchTokens,
    data,
    tokens,
    resetTokens,
    filterTokens,
    totalTokens: data?.tokens?.length ?? 0,
    ...queryReturn,
  };
}
