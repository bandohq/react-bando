import { within, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useNavigate } from 'react-router-dom';
import useUser from '@hooks/useUser';

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
jest.mock('@config/constants/currencies', () => ({
  ...jest.requireActual('@config/constants/currencies'),
  sendCurrency: [
    {
      label: 'MXN',
      value: 'MXN',
    },
    {
      label: 'USD',
      value: 'USD',
    },
  ],
  depositCurrency: [
    {
      label: 'USDC',
      value: 'USDC',
    },
    {
      label: 'USDT',
      value: 'USDT',
    },
  ],
}));

import GetQuoteForm from '.';

describe('GetQuoteForm', () => {
  const navigate = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(navigate);
    (useUser as jest.Mock).mockReturnValue({});
    (debouce as jest.Mock).mockImplementation((fn) => fn);

    (axios.post as jest.Mock).mockResolvedValue({
      data: {
        id: 46,
        base_currency: 'MXN',
        base_amount: '1000.00',
        quote_currency: 'USDC',
        quote_amount: '58.47',
        is_expired: false,
        expires_at: '2024-01-10T23:06:08.388000Z',
      },
    });
  });

  it('should render GetQuoteForm', async () => {
    render(<GetQuoteForm />, { wrapper });
    screen.getByText('Recibes');
    screen.getByText('Envias');
    screen.getByText('Continuar');
  });

  it('should change the value of the input and keep only two decimals, anmd remove letters', async () => {
    render(<GetQuoteForm />, { wrapper });

    const input = screen.getByLabelText('baseAmount') as HTMLInputElement;
    await userEvent.type(input, '100');
    expect(input.value).toBe('100');

    await userEvent.type(input, '{backspace}');
    await userEvent.type(input, '{backspace}');
    expect(input.value).toBe('1');

    await userEvent.clear(input);
    await userEvent.type(input, '500.755555');
    expect(input.value).toBe('500.75');

    await userEvent.type(input, '{backspace}');
    await userEvent.type(input, '{backspace}');
    expect(input.value).toBe('500.');

    await userEvent.clear(input);
    await userEvent.type(input, 'abcd600.234');
    expect(input.value).toBe('600.23');
  });

  it('changing value on operationType also changes the value in baseCurrency and quoteCurrency', async () => {
    const { container } = render(<GetQuoteForm />, { wrapper });

    const [operationType] = screen.getAllByRole('combobox');

    const baseCurrencyInput = within(container).getByDisplayValue('MXN') as HTMLInputElement;
    const quoteCurrencyInput = within(container).getByDisplayValue('USDC') as HTMLInputElement;

    await userEvent.click(operationType);
    const options = screen.getAllByRole('option');
    await userEvent.click(options[1]);

    await waitFor(() => {
      expect(baseCurrencyInput.value).toBe('USDC');
      expect(quoteCurrencyInput.value).toBe('MXN');
    });

    await userEvent.click(operationType);
    const options1 = screen.getAllByRole('option');
    await userEvent.click(options1[0]);

    await waitFor(() => {
      expect(baseCurrencyInput.value).toBe('MXN');
      expect(quoteCurrencyInput.value).toBe('USDC');
    });
  });

  it('should not request a quote when changing currencies unless the base amount has value', async () => {
    render(<GetQuoteForm />, { wrapper });

    const selects = screen.getAllByRole('combobox');
    const baseCurrency = selects[2];
    const quoteCurrency = selects[3];

    await userEvent.click(baseCurrency);
    const options = screen.getAllByRole('option');
    await userEvent.click(options[1]);

    await waitFor(() => {
      expect(axios.post).not.toHaveBeenCalled();
    });

    const input = screen.getByLabelText('baseAmount') as HTMLInputElement;
    await userEvent.type(input, '10');
    expect(input.value).toBe('10');

    await userEvent.click(baseCurrency);
    const options1 = screen.getAllByRole('option');
    await userEvent.click(options1[0]);

    await waitFor(() => {
      expect(axios.post).toHaveBeenLastCalledWith('/api/v1/ramps/quote/', {
        base_amount: '10',
        base_currency: 'MXN',
        quote_currency: 'USDC',
        network: 'POLYGON',
      });
    });

    await userEvent.click(baseCurrency);
    const options2 = screen.getAllByRole('option');
    await userEvent.click(options2[1]);

    await userEvent.click(quoteCurrency);
    const options3 = screen.getAllByRole('option');
    await userEvent.click(options3[1]);

    await waitFor(() => {
      expect(axios.post).toHaveBeenLastCalledWith('/api/v1/ramps/quote/', {
        base_amount: '10',
        base_currency: 'USD',
        quote_currency: 'USDT',
        network: 'POLYGON',
      });
    });
  });

  it('should make a request for a quote when submiting form and save data in localstorage and send the user to signin if they are not logged in', async () => {
    render(<GetQuoteForm />, { wrapper });

    const baseAmountInput = screen.getByLabelText('baseAmount') as HTMLInputElement;
    const quoteAmountInput = screen.getByLabelText('quoteAmount') as HTMLInputElement;
    const submitBtn = screen.getByRole('button', { name: 'Continuar' });
    await userEvent.type(baseAmountInput, '1000.00');

    userEvent.click(submitBtn);

    await waitFor(() => {
      expect(quoteAmountInput.value).toBe('58.47');
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'bando_ramp_data',
        '{"quote":{"id":46,"baseCurrency":"MXN","baseAmount":1000,"quoteCurrency":"USDC","quoteAmount":58.47,"quoteRate":null,"quoteRateInverse":null,"isExpired":false,"expiresAt":"2024-01-10T23:06:08.388000Z"},"network":"POLYGON","operationType":"deposit"}',
      );
      expect(navigate).toHaveBeenCalledWith('/signin');
    });
  });

  it('should send the user to kyc upon success if they are logged in and have not completed kyc', async () => {
    (useUser as jest.Mock).mockReturnValue({ user: { email: 'email', kycLevel: 0 } });

    render(<GetQuoteForm />, { wrapper });

    const baseAmountInput = screen.getByLabelText('baseAmount') as HTMLInputElement;
    const submitBtn = screen.getByRole('button', { name: 'Continuar' });
    await userEvent.type(baseAmountInput, '1000.00');

    userEvent.click(submitBtn);

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith('/kyc');
    });
  });

  it('should send the user to ramp upon success if they are logged in', async () => {
    (useUser as jest.Mock).mockReturnValue({ user: { email: 'email', id: 1, kycLevel: 1 } });

    render(<GetQuoteForm />, { wrapper });

    const baseAmountInput = screen.getByLabelText('baseAmount') as HTMLInputElement;
    const submitBtn = screen.getByRole('button', { name: 'Continuar' });
    await userEvent.type(baseAmountInput, '1000.00');

    userEvent.click(submitBtn);

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith('/ramp');
    });
  });

  it('should handle an error when backend fails', async () => {
    (axios.post as jest.Mock).mockRejectedValue({});

    render(<GetQuoteForm />, { wrapper });

    const baseAmountInput = screen.getByLabelText('baseAmount') as HTMLInputElement;
    const quoteAmountInput = screen.getByLabelText('quoteAmount') as HTMLInputElement;
    const submitBtn = screen.getByRole('button', { name: 'Continuar' });
    await userEvent.type(baseAmountInput, '1000.00');

    userEvent.click(submitBtn);

    await waitFor(() => {
      expect(quoteAmountInput.value).toBe('0.00');
      expect(localStorage.setItem).not.toHaveBeenCalledWith();
      expect(navigate).not.toHaveBeenCalledWith('/ramp');
    });
  });

  it('should make a request for a quote when typing a new value', async () => {
    render(<GetQuoteForm />, { wrapper });

    const baseAmountInput = screen.getByLabelText('baseAmount') as HTMLInputElement;
    const quoteAmountInput = screen.getByLabelText('quoteAmount') as HTMLInputElement;
    await userEvent.type(baseAmountInput, '1000.00');

    await waitFor(() => {
      expect(quoteAmountInput.value).toBe('58.47');
    });
  });

  it('should cround quote amount to two decimals', async () => {
    (axios.post as jest.Mock).mockResolvedValue({
      data: {
        id: 46,
        base_currency: 'MXN',
        base_amount: '500000.00',
        quote_currency: 'USDC',
        quote_amount: '29056.901316254385',
        is_expired: false,
        expires_at: '2024-01-10T23:06:08.388000Z',
      },
    });

    render(<GetQuoteForm />, { wrapper });

    const baseAmountInput = screen.getByLabelText('baseAmount') as HTMLInputElement;
    const quoteAmountInput = screen.getByLabelText('quoteAmount') as HTMLInputElement;
    await userEvent.type(baseAmountInput, '500000.00');

    await waitFor(() => {
      expect(quoteAmountInput.value).toBe('29,056.90');
    });
  });
});
