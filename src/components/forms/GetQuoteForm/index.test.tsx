import { within, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import wrapper from '@helpers/TestProvider';

import axios from 'axios';

jest.mock('axios');

import GetQuoteForm from '.';
import { act } from 'react-dom/test-utils';

describe('GetQuoteForm', () => {
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
      },
    });
  });

  it('should render GetQuoteForm', async () => {
    render(<GetQuoteForm />, { wrapper });
    screen.getByText('Recibes');
    screen.getByText('Envias');
    screen.getByText('Tipo de cambio (USDT/MXN):');
    screen.getByText('Tipo de cambio (USDT/MXN):');
    screen.getByText('Depositar');
  });

  it('should change the value of the input and remove dots', async () => {
    render(<GetQuoteForm />, { wrapper });

    const input = screen.getByLabelText('baseAmount') as HTMLInputElement;
    await userEvent.type(input, '100');
    expect(input.value).toBe('100');

    await userEvent.clear(input);
    await userEvent.type(input, '500.75');
    expect(input.value).toBe('50075');
  });

  it('changing value on baseCurrency also changes the value in quoteCurrency', async () => {
    const { container } = render(<GetQuoteForm />, { wrapper });

    const baseCurrency = screen.getAllByRole('combobox')[1];
    const baseCurrencyInput = within(container).getByDisplayValue('MXN') as HTMLInputElement;
    const quoteCurrencyInput = within(container).getByDisplayValue('USDC') as HTMLInputElement;

    await userEvent.click(baseCurrency);
    const options = screen.getAllByRole('option');
    await userEvent.click(options[1]);

    await waitFor(() => {
      expect(baseCurrencyInput.value).toBe('USDC');
      expect(quoteCurrencyInput.value).toBe('MXN');
    });
  });

  it('changing value on quoteCurrency also changes the value in baseCurrency', async () => {
    const { container } = render(<GetQuoteForm />, { wrapper });

    const quoteCurrency = screen.getAllByRole('combobox')[2];
    const baseCurrencyInput = within(container).getByDisplayValue('MXN') as HTMLInputElement;
    const quoteCurrencyInput = within(container).getByDisplayValue('USDC') as HTMLInputElement;

    await userEvent.click(quoteCurrency);
    const options = screen.getAllByRole('option');
    await userEvent.click(options[0]);

    expect(baseCurrencyInput.value).toBe('USDC');
    expect(quoteCurrencyInput.value).toBe('MXN');
  });

  it('should make a request for a quote', async () => {
    render(<GetQuoteForm />, { wrapper });

    const baseAmountInput = screen.getByLabelText('baseAmount') as HTMLInputElement;
    const quoteAmountInput = screen.getByLabelText('quoteAmount') as HTMLInputElement;
    await userEvent.type(baseAmountInput, '1000');

    act(() => {
      userEvent.click(quoteAmountInput);
    });

    await waitFor(() => {
      expect(quoteAmountInput.value).toBe('58.47');
    });
  });
});
