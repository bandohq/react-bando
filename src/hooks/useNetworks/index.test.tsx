import '@config/axios';
import axios from 'axios';
import { renderHook, waitFor } from '@testing-library/react';

import wrapper from '@helpers/TestProvider';
import mockNetworks from './mock';

jest.mock('axios');

import useNetworks from '.';

describe('useNetworks', () => {
  beforeEach(() => {
    (axios.get as jest.Mock).mockResolvedValue({
      data: mockNetworks,
    });
  });

  it('gets the networks list', async () => {
    const { result } = renderHook(() => useNetworks(), { wrapper });

    expect(result.current.networks).toBeUndefined();
    expect(result.current.totalNetworks).toBe(0);

    await waitFor(() => {
      expect(result.current.totalNetworks).toBe(3);
      expect(result.current.networks).toStrictEqual([
        {
          chainId: 1,
          explorerUrl: 'https://etherscan.io/',
          isActive: true,
          isTestnet: false,
          key: 'eth',
          logoUrl:
            'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/ethereum.svg',
          name: 'Ethereum',
          networkType: 'EVM',
          rpcUrl: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
        },
        {
          chainId: 42161,
          explorerUrl: 'https://arbiscan.io/',
          isActive: true,
          isTestnet: false,
          key: 'arb',
          logoUrl:
            'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/arbitrum.svg',
          name: 'Arbitrum',
          networkType: 'EVM',
          rpcUrl: 'https://arb1.arbitrum.io/rpc',
        },
        {
          chainId: 137,
          explorerUrl: 'https://polygonscan.com/',
          isActive: true,
          isTestnet: false,
          key: 'pol',
          logoUrl:
            'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/polygon.svg',
          name: 'Polygon',
          networkType: 'EVM',
          rpcUrl: 'https://polygon-rpc.com/',
        },
      ]);
    });
  });
});
