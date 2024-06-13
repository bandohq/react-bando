import '@config/axios';
import axios from 'axios';
import { renderHook } from '@testing-library/react';

import wrapper from '@helpers/TestProvider';

jest.mock('axios');

import useKyc from '.';

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

describe('useKyc', () => {
  beforeEach(() => {
    (axios.post as jest.Mock).mockResolvedValue({
      data: mockTransactionResponse,
    });

    (axios.get as jest.Mock).mockResolvedValue({
      data: mockTransactionResponse,
    });
  });

  it('makes a request with correct payload for a user kyc', async () => {
    const { result } = renderHook(() => useKyc(), { wrapper });

    await result.current.postUserKyc({
      email: 'email',
      type: 'type',
      firstName: 'firstName',
      lastName: 'firstName',
      phone: 'phone',
      dateOfBirth: 'dateOfBirth',
      address: {
        street: 'street',
        state: 'state',
        zip: 'zip',
        country: 'country',
      },
      nationalIdNumber: 'nationalIdNumber',
      document: {
        type: 'type',
        number: 'number',
        country: 'country',
      },
    });

    expect(axios.post).toHaveBeenCalledWith('/api/v1/ramps/kyc/user/', {
      address: {
        city: 'state',
        country: 'country',
        street: 'street',
        zip: 'zip',
      },
      date_of_birth: 'dateOfBirth',
      document: {
        country: 'country',
        number: 'number',
        type: 'type',
      },
      email: 'email',
      first_name: 'firstName',
      last_name: 'firstName',
      national_id_number: 'nationalIdNumber',
      phone: 'phone',
      type: 'type',
    });
  });
});
