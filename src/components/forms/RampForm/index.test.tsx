import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import { render, screen } from '@testing-library/react';

import { useNavigate } from 'react-router-dom';
import { PropsWithChildren } from 'react';

import MagicProvider from '@hooks/useMagicLinkAuth/MagicProvider';
import MagicUserProvider from '@hooks/useUser/MagicUserProvider';

import TestProvider from '@helpers/TestProvider';
import debouce from 'lodash/debounce';
import axios from 'axios';

jest.mock('axios');
jest.mock('lodash/debounce');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

import RampForm from '.';

const address = '0x8ba1f109551bd432803012645ac136ddd64dba72';

const wrapper = ({ children }: PropsWithChildren) => (
  <TestProvider>
    <MagicProvider>
      <MagicUserProvider>{children}</MagicUserProvider>
    </MagicProvider>
  </TestProvider>
);

describe('RampForm', () => {
  const navigate = jest.fn();

  beforeEach(() => {
    (localStorage.getItem as jest.Mock).mockReturnValue(
      '{"quote":{"id":228,"baseCurrency":"MXN","baseAmount":1000,"quoteCurrency":"USDC","quoteAmount":57.55,"quoteRate":0.06,"quoteRateInverse":17.38,"isExpired":false,"expiresAt":"2024-01-16T22:02:51.960000Z"},"network":"POLYGON","operationType":"deposit"}',
    );
    (useNavigate as jest.Mock).mockReturnValue(navigate);
    (debouce as jest.Mock).mockImplementation((fn) => fn);
    (axios.post as jest.Mock).mockResolvedValueOnce(true).mockResolvedValueOnce({
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

  it('should return nothing when there is no user or quote', async () => {
    (localStorage.getItem as jest.Mock).mockReturnValue('');
    render(<RampForm />, { wrapper });
    expect(() => screen.getByText('MXN')).toThrow();
  });

  describe('with user information', () => {
    beforeEach(() => {
      (axios.get as jest.Mock).mockResolvedValue({
        data: {
          id: 46,
          kyc_level: 'kyc_level',
          external_id: 'external_id',
          first_name: 'first_name',
          last_name: 'last_name',
          killb_id: 'killb_id',
          date_of_birth: 'date_of_birth',
          phone: 'phone',
          national_id_number: 'national_id_number',
        },
      });
    });

    it('should render RampForm', async () => {
      render(<RampForm />, { wrapper });
      screen.getByText('MXN');
      screen.getByText('USDC');
      screen.getByText('$ 1000');
      screen.getByText('$ 57.55');
      screen.getByText('$ 17.38');
    });
  });

  it('should request a recipient and post a transaction and show the cashin details for a deposit', async () => {
    render(<RampForm />, { wrapper });

    const addressInput = screen.getByLabelText('address') as HTMLInputElement;
    const submitBtn = screen.getByRole('button', { name: 'Confirmar' });
    await userEvent.type(addressInput, address);

    await userEvent.click(submitBtn);

    await waitFor(() => {
      screen.getByText(/Deposita tu MXN a esta cuenta/i);
      screen.getByText(/Banco:/i);
      screen.getByText(/Nombre:/i);
      screen.getByText(/CLABE:/i);
      screen.getByText(/Concepto:/i);
    });
  });

  it('should request a recipient and post a transaction and show the cashin details for a withdraw', async () => {
    (axios.post as jest.Mock).mockRestore();
    (localStorage.getItem as jest.Mock).mockReturnValue(
      '{"quote":{"id":70,"baseCurrency":"USDC","baseAmount":5000,"quoteCurrency":"MXN","quoteAmount":85402.9,"quoteRate":17.08,"quoteRateInverse":0.06,"isExpired":false,"expiresAt":"2024-01-29T21:01:31.472000Z"},"network":"POLYGON","operationType":"withdraw"}',
    );
    (axios.post as jest.Mock).mockResolvedValueOnce(true).mockResolvedValueOnce({
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
    render(<RampForm />, { wrapper });

    const clabeInput = screen.getByLabelText('clabe') as HTMLInputElement;
    const firstNameInput = screen.getByLabelText('firstName') as HTMLInputElement;
    const lastNameInput = screen.getByLabelText('lastName') as HTMLInputElement;

    const submitBtn = screen.getByRole('button', { name: 'Confirmar' });
    await userEvent.type(clabeInput, '123456789123456789');
    await userEvent.type(firstNameInput, 'firstName');
    await userEvent.type(lastNameInput, 'lastName');

    await userEvent.click(submitBtn);

    await waitFor(() => {
      screen.getByText(/Deposita tu MXN a esta dirección en network/i);
      screen.getByText(/Dirección:/i);
    });
  });
});
