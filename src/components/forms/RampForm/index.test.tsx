import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import useUser from '@hooks/useUser';

import { useNavigate } from 'react-router-dom';

import wrapper from '@helpers/TestProvider';
import debouce from 'lodash/debounce';
import axios from 'axios';

jest.mock('axios');
jest.mock('lodash/debounce');
jest.mock('@hooks/useUser');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

import RampForm from '.';

const address = '0x8ba1f109551bd432803012645ac136ddd64dba72';

describe('RampForm', () => {
  const navigate = jest.fn();

  beforeEach(() => {
    (localStorage.getItem as jest.Mock).mockReturnValue(
      '{"quote":{"id":228,"baseCurrency":"MXN","baseAmount":1000,"quoteCurrency":"USDC","quoteAmount":57.55,"quoteRate":0.06,"quoteRateInverse":17.38,"isExpired":false,"expiresAt":"2024-01-16T22:02:51.960000Z"},"network":"POLYGON","operationType":"deposit"}',
    );
    (useNavigate as jest.Mock).mockReturnValue(navigate);
    (useUser as jest.Mock).mockReturnValue({ user: null });
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
          Beneficiary: 'beneficiary',
          CLABE: 'clabe',
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
      (useUser as jest.Mock).mockReturnValue({
        user: {
          id: 46,
          kycLevel: 1,
          externalId: 'external_id',
          firstName: 'first_name',
          lastName: 'last_name',
          killbId: 'killb_id',
          dateOfBirth: 'date_of_birth',
          phone: 'phone',
          nationalIdNumber: 'national_id_number',
          email: 'email@email.com',
        },
      });
    });

    it('should render RampForm', async () => {
      render(<RampForm />, { wrapper });

      await waitFor(() => {
        screen.getByText('MXN');
        screen.getByText('USDC');
        screen.getByText('1,000.00');
        screen.getByText('57.55');
        screen.getByText(/17.38/i);
      });
    });

    it('should request a recipient and post a transaction and show the cashin details for a deposit', async () => {
      render(<RampForm />, { wrapper });

      const addressInput = screen.getByLabelText('address') as HTMLInputElement;
      const submitBtn = screen.getByRole('button', { name: 'Confirmar' });
      await userEvent.type(addressInput, address);

      await userEvent.click(submitBtn);

      await waitFor(() => {
        expect(navigate).toHaveBeenCalledWith('/transactions/555');
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
        expect(navigate).toHaveBeenCalledWith('/transactions/555');
      });
    });
  });
});
