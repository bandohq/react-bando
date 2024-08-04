import useSWR, { useSWRConfig } from 'swr';

import { getNetworks } from './requests';
import endpoints from '@config/endpoints';
import { useCallback } from 'react';

export default function useNetworks(direction: 'deposit' | 'withdraw' = 'deposit') {
  const { mutate } = useSWRConfig();
  const { data: networks, ...queryReturn } = useSWR(
    endpoints.networks,
    () => getNetworks(endpoints.networks, direction),
    {
      revalidateOnFocus: false,
    },
  );

  const refetchNetworks = useCallback(() => {
    mutate(endpoints.networks);
  }, [mutate]);

  return {
    refetchNetworks,
    networks,
    totalNetworks: networks?.length ?? 0,
    ...queryReturn,
  };
}
