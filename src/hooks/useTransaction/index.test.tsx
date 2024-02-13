import '@config/axios';
import axios from 'axios';
import { renderHook } from '@testing-library/react';

import wrapper from '@helpers/TestProvider';

jest.mock('axios');

import useTransaction from '.';

describe('useTransaction', () => {
  beforeEach(() => {
    (axios.post as jest.Mock).mockResolvedValue({
      data: {
        id: 46,
        transaction_id: 555,
        status: 'passed',
        base_amount: 1000,
        quoteAmount: 5000,
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
      },
    });
  });

  it('updates values and returns expected data for off ramp', async () => {
    const { result } = renderHook(() => useTransaction({ transactionId: '555' }), { wrapper });

    const rsp = await result.current.postTransaction({
      accountAddress: '123456789123456789',
      accountNetwork: 'accountNetwork',
      operationType: 'withdraw',
      baseAmount: 1000,
      baseCurrency: 'MXN',
      quoteCurrency: 'USDC',
      network: 'network',
    });

    expect(axios.post).toHaveBeenCalledWith('/api/v1/ramps/transaction/', {
      account_address: '123456789123456789',
      account_network: 'SPEI',
      account_type: 'SPEI',
      cash_in_type: 'WALLET_ACCOUNT',
      quote: {
        base_amount: '1000',
        base_currency: 'MXN',
        quote_currency: 'USDC',
        network: 'accountNetwork',
      },
    });

    expect(rsp).toStrictEqual({
      baseAmount: 1000,
      baseCurrency: 'MXN',
      cashInNetwork: 'cash_in_network',
      cashinDetails: {
        bank: 'bank',
        beneficiary: 'beneficiary',
        clabe: 'clabe',
        concepto: 'concepto',
        network: 'network',
      },
      endNetwork: 'end_network',
      fee: 2,
      id: 46,
      providerStatus: 'provider_status',
      quoteAmount: 58.47,
      quoteCurrency: 'USDC',
      rate: 1,
      status: 'passed',
      transactionId: 555,
    });
  });

  it('updates values and returns expected data for  ramp', async () => {
    (axios.post as jest.Mock).mockResolvedValue({
      data: {
        id: 46,
        transaction_id: 555,
        status: 'passed',
        base_amount: 1000,
        quoteAmount: 5000,
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
          address: 'address',
        },
      },
    });

    const { result } = renderHook(() => useTransaction({ transactionId: '555' }), { wrapper });

    const rsp = await result.current.postTransaction({
      accountAddress: 'accountAddress',
      accountNetwork: 'accountNetwork',
      operationType: 'deposit',
      baseAmount: 1000,
      baseCurrency: 'MXN',
      quoteCurrency: 'USDC',
      network: 'network',
    });

    expect(axios.post).toHaveBeenCalledWith('/api/v1/ramps/transaction/', {
      account_address: 'accountAddress',
      account_network: 'accountNetwork',
      account_type: 'WALLET_ACCOUNT',
      cash_in_type: 'SPEI',
      quote: {
        base_amount: '1000',
        base_currency: 'MXN',
        quote_currency: 'USDC',
        network: 'accountNetwork',
      },
    });
    expect(rsp).toStrictEqual({
      baseAmount: 1000,
      baseCurrency: 'MXN',
      cashInNetwork: 'cash_in_network',
      cashinDetails: {
        address: 'address',
        network: 'network',
      },
      endNetwork: 'end_network',
      fee: 2,
      id: 46,
      providerStatus: 'provider_status',
      quoteAmount: 58.47,
      quoteCurrency: 'USDC',
      rate: 1,
      status: 'passed',
      transactionId: 555,
    });
  });
});
