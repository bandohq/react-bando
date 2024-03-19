import '@config/axios';
import axios from 'axios';
import { renderHook } from '@testing-library/react';

import wrapper from '@helpers/TestProvider';

jest.mock('axios');

import useRecipient from '.';

const mockTransactionResponse = {
  id: 46,
  transaction_id: 555,
  status: 'passed',
  base_amount: 1000,
  base_currency: 'MXN',
  quote_currency: 'USDC',
  quote_amount: '58.47',
  rate: '1',
  fee: '2',
  is_expired: false,
  cash_in_network: 'cash_in_network',
  provider_status: 'provider_status',
  end_network: 'end_network',
  cash_in_details: {
    network: 'network',
    bank: 'bank',
    beneficiary: 'beneficiary',
    clabe: 'clabe',
    concepto: 'concepto',
  },
};

describe('useRecipient', () => {
  beforeEach(() => {
    (axios.post as jest.Mock).mockResolvedValue({
      data: mockTransactionResponse,
    });

    (axios.get as jest.Mock).mockResolvedValue({
      data: mockTransactionResponse,
    });
  });

  it('makes a request with correct payload for a deposit', async () => {
    const { result } = renderHook(() => useRecipient(), { wrapper });

    await result.current.postRecipient({
      asset: 'asset',
      email: 'email',
      network: 'polygon',
      address: 'address',
      walletName: 'walletName',
      operationType: 'deposit',
    });

    expect(axios.post).toHaveBeenCalledWith('/api/v1/ramps/recipient/', {
      account_type: 'WALLET_ACCOUNT',
      asset: 'asset',
      network: 'POLYGON',
      data: {
        address: 'address',
        wallet_name: 'walletName',
      },
    });
  });

  it('makes a request with correct payload for a withdraw', async () => {
    const { result } = renderHook(() => useRecipient(), { wrapper });

    await result.current.postRecipient({
      asset: 'asset',
      email: 'email',
      network: 'polygon',
      clabe: 'clabe',
      firstName: 'firstName',
      lastName: 'lastName',
      operationType: 'withdraw',
    });

    expect(axios.post).toHaveBeenCalledWith('/api/v1/ramps/recipient/', {
      account_type: 'SPEI',
      asset: 'MXN',
      network: 'SPEI',
      data: {
        address: 'clabe',
        first_name: 'firstName',
        last_name: 'lastName',
      },
    });
  });
});
