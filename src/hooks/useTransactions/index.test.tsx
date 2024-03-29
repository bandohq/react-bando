import '@config/axios';
import axios from 'axios';
import { renderHook, waitFor } from '@testing-library/react';

import wrapper from '@helpers/TestProvider';

jest.mock('axios');
jest.useFakeTimers();

import useTransactions from '.';

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
  direction: 'OFF',
  is_expired: false,
  cash_in_network: 'cash_in_network',
  provider_status: 'provider_status',
  end_network: 'end_network',
  created_at: 'created_at',
  updated_at: 'updated_at',
  cash_in_details: {
    network: 'network',
    bank: 'bank',
    beneficiary: 'beneficiary',
    clabe: 'clabe',
    concepto: 'concepto',
  },
};

const mockTransactionList = {
  '2024-03-01': [mockTransactionResponse, mockTransactionResponse],
  '2024-03-18': [mockTransactionResponse, mockTransactionResponse],
};

describe('useTransactions', () => {
  beforeEach(() => {
    (axios.get as jest.Mock).mockResolvedValue({
      data: mockTransactionList,
    });
  });

  it('gets the transaction list', async () => {
    const { result } = renderHook(() => useTransactions(), { wrapper });

    expect(result.current.transactions).toBeUndefined();

    await waitFor(() => {
      expect(result.current.transactions).toStrictEqual({
        '2024-03-01': [
          {
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
            createdAt: 'created_at',
            endNetwork: 'end_network',
            fee: 2,
            id: 46,
            operationType: 'withdraw',
            providerStatus: 'provider_status',
            quoteAmount: 58.47,
            quoteCurrency: 'USDC',
            rate: 1,
            status: 'passed',
            transactionId: 555,
            updatedAt: 'updated_at',
          },
          {
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
            createdAt: 'created_at',
            endNetwork: 'end_network',
            fee: 2,
            id: 46,
            operationType: 'withdraw',
            providerStatus: 'provider_status',
            quoteAmount: 58.47,
            quoteCurrency: 'USDC',
            rate: 1,
            status: 'passed',
            transactionId: 555,
            updatedAt: 'updated_at',
          },
        ],
        '2024-03-18': [
          {
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
            createdAt: 'created_at',
            endNetwork: 'end_network',
            fee: 2,
            id: 46,
            operationType: 'withdraw',
            providerStatus: 'provider_status',
            quoteAmount: 58.47,
            quoteCurrency: 'USDC',
            rate: 1,
            status: 'passed',
            transactionId: 555,
            updatedAt: 'updated_at',
          },
          {
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
            createdAt: 'created_at',
            endNetwork: 'end_network',
            fee: 2,
            id: 46,
            operationType: 'withdraw',
            providerStatus: 'provider_status',
            quoteAmount: 58.47,
            quoteCurrency: 'USDC',
            rate: 1,
            status: 'passed',
            transactionId: 555,
            updatedAt: 'updated_at',
          },
        ],
      });
    });
  });
});
