import '@config/axios';
import axios from 'axios';
import { renderHook, waitFor } from '@testing-library/react';

import wrapper from '@helpers/TestProvider';

jest.mock('axios');

import useQuote from '.';

describe('useQuote', () => {
  beforeEach(() => {
    (axios.post as jest.Mock).mockResolvedValue({
      data: {
        id: 46,
        base_currency: 'MXN',
        base_amount: '1000.00',
        quote_currency: 'USDC',
        quote_amount: '58.47',
        is_expired: false,
        expires_at: '2024-01-10T23:06:08.388000Z',
        quote_rate: '5.05',
        quote_rate_reciprocal: '16.85',
      },
    });
  });

  it('returns expected values', async () => {
    const { result } = renderHook(useQuote, { wrapper });

    expect(result.current.data).toBeUndefined();
    await result.current.getQuote({ baseAmount: 1000, baseCurrency: 'MXN', quoteCurrency: 'USDC' });

    await waitFor(() => {
      expect(result.current.data).toStrictEqual({
        baseAmount: 1000,
        baseCurrency: 'MXN',
        expiresAt: '2024-01-10T23:06:08.388000Z',
        id: 46,
        isExpired: false,
        quoteAmount: 58.47,
        quoteCurrency: 'USDC',
        quoteRate: 5.05,
        quoteRateInverse: 16.85,
      });
    });
  });
});
