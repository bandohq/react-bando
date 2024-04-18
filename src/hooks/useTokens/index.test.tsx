import '@config/axios';
import axios from 'axios';
import { renderHook, waitFor } from '@testing-library/react';

import wrapper from '@helpers/TestProvider';
import mockTokensResponse from './mock';

jest.mock('axios');

import useTokens from '.';

describe('useTokens', () => {
  beforeEach(() => {
    (axios.get as jest.Mock).mockResolvedValue({
      data: mockTokensResponse,
    });
  });

  it('gets the tokens list', async () => {
    const { result } = renderHook(() => useTokens({ chainKey: 'pol' }), { wrapper });

    expect(result.current.data).toBeUndefined();
    expect(result.current.totalPageTokens).toBe(0);

    await waitFor(() => {
      expect(result.current.totalPageTokens).toBe(3);
      expect(result.current.data).toStrictEqual({
        count: 1348,
        next: 'http://localhost:8000/api/v1/ramps/token/pol/?page=2',
        previous: null,
        tokens: [
          {
            address: '0x9627a3d6872bE48410fCEce9b1dDD344Bf08c53e',
            decimals: 2,
            id: 33065,
            imageUrl: null,
            isOfframpActive: false,
            isOfframpVerified: true,
            isOnrampActive: false,
            isOnrampVerified: true,
            key: 'ACE',
            maxAllowance: null,
            minAllowance: null,
            name: 'MetaTrace Utility Token',
            symbol: 'ACE',
          },
          {
            address: '0x784665471bB8B945b57A76a9200B109Ee214E789',
            decimals: 6,
            id: 33000,
            imageUrl: null,
            isOfframpActive: false,
            isOfframpVerified: true,
            isOnrampActive: false,
            isOnrampVerified: true,
            key: 'KC',
            maxAllowance: null,
            minAllowance: null,
            name: 'Krasnalcoin',
            symbol: 'KC',
          },
          {
            address: '0xAb9CB20A28f97e189ca0B666B8087803Ad636b3C',
            decimals: 18,
            id: 33410,
            imageUrl: null,
            isOfframpActive: false,
            isOfframpVerified: true,
            isOnrampActive: false,
            isOnrampVerified: true,
            key: 'MDUS',
            maxAllowance: null,
            minAllowance: null,
            name: 'Medieus Token',
            symbol: 'MDUS',
          },
        ],
      });
    });
  });
});
