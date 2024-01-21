// import { within, render, screen, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

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
      '{"quote":{"id":228,"baseCurrency":"MXN","baseAmount":1000,"quoteCurrency":"USDC","quoteAmount":57.55,"quoteRate":0.06,"quoteRateInverse":17.38,"isExpired":false,"expiresAt":"2024-01-16T22:02:51.960000Z"},"network":"POLYGON"}',
    );
    (useNavigate as jest.Mock).mockReturnValue(navigate);
    (debouce as jest.Mock).mockImplementation((fn) => fn);
  });

  it('should return nothing when there is no user or quote', async () => {
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

    it.only('should render RampForm', async () => {
      render(<RampForm />, { wrapper });
      // screen.getByText('MXN');
      // screen.getByText('USD');
      // screen.getByText('$ 1000');
      // screen.getByText('$ 57.55');
    });
  });

  // it('should change the value of the input and keep only two decimals, anmd remove letters', async () => {
  //   render(<RampForm />, { wrapper });

  //   const input = screen.getByLabelText('baseAmount') as HTMLInputElement;
  //   await userEvent.type(input, '100');
  //   expect(input.value).toBe('100');

  //   await userEvent.type(input, '{backspace}');
  //   await userEvent.type(input, '{backspace}');
  //   expect(input.value).toBe('1');

  //   await userEvent.clear(input);
  //   await userEvent.type(input, '500.755555');
  //   expect(input.value).toBe('500.75');

  //   await userEvent.type(input, '{backspace}');
  //   await userEvent.type(input, '{backspace}');
  //   expect(input.value).toBe('500.');

  //   await userEvent.clear(input);
  //   await userEvent.type(input, 'abcd600.234');
  //   expect(input.value).toBe('600.23');
  // });

  // it('changing value on operationType also changes the value in baseCurrency and quoteCurrency', async () => {
  //   const { container } = render(<RampForm />, { wrapper });

  //   const [operationType] = screen.getAllByRole('combobox');

  //   const baseCurrencyInput = within(container).getByDisplayValue('MXN') as HTMLInputElement;
  //   const quoteCurrencyInput = within(container).getByDisplayValue('USDC') as HTMLInputElement;

  //   await userEvent.click(operationType);
  //   const options = screen.getAllByRole('option');
  //   await userEvent.click(options[1]);

  //   await waitFor(() => {
  //     expect(baseCurrencyInput.value).toBe('USDC');
  //     expect(quoteCurrencyInput.value).toBe('MXN');
  //   });

  //   await userEvent.click(operationType);
  //   const options1 = screen.getAllByRole('option');
  //   await userEvent.click(options1[0]);

  //   await waitFor(() => {
  //     expect(baseCurrencyInput.value).toBe('MXN');
  //     expect(quoteCurrencyInput.value).toBe('USDC');
  //   });
  // });

  // it('should not request a quote when changing currencies unless the base amount has value', async () => {
  //   render(<RampForm />, { wrapper });

  //   const selects = screen.getAllByRole('combobox');
  //   const baseCurrency = selects[2];
  //   const quoteCurrency = selects[3];

  //   await userEvent.click(baseCurrency);
  //   const options = screen.getAllByRole('option');
  //   await userEvent.click(options[1]);

  //   await waitFor(() => {
  //     expect(axios.post).not.toHaveBeenCalled();
  //   });

  //   const input = screen.getByLabelText('baseAmount') as HTMLInputElement;
  //   await userEvent.type(input, '10');
  //   expect(input.value).toBe('10');

  //   await userEvent.click(baseCurrency);
  //   const options1 = screen.getAllByRole('option');
  //   await userEvent.click(options1[0]);

  //   await waitFor(() => {
  //     expect(axios.post).toHaveBeenLastCalledWith('/api/v1/ramps/quote/', {
  //       base_amount: '10',
  //       base_currency: 'MXN',
  //       quote_currency: 'USDC',
  //     });
  //   });

  //   await userEvent.click(baseCurrency);
  //   const options2 = screen.getAllByRole('option');
  //   await userEvent.click(options2[1]);

  //   await userEvent.click(quoteCurrency);
  //   const options3 = screen.getAllByRole('option');
  //   await userEvent.click(options3[1]);

  //   await waitFor(() => {
  //     expect(axios.post).toHaveBeenLastCalledWith('/api/v1/ramps/quote/', {
  //       base_amount: '10',
  //       base_currency: 'USD',
  //       quote_currency: 'USDT',
  //     });
  //   });
  // });

  // it('should make a request for a quote when submiting form and save data in localstorage', async () => {
  //   render(<RampForm />, { wrapper });

  //   const baseAmountInput = screen.getByLabelText('baseAmount') as HTMLInputElement;
  //   const quoteAmountInput = screen.getByLabelText('quoteAmount') as HTMLInputElement;
  //   const submitBtn = screen.getByRole('button', { name: 'Continuar' });
  //   await userEvent.type(baseAmountInput, '1000');

  //   userEvent.click(submitBtn);

  //   await waitFor(() => {
  //     expect(quoteAmountInput.value).toBe('58.47');
  //     expect(localStorage.setItem).toHaveBeenCalledWith(
  //       'bando_ramp_data',
  //       '{"quote":{"id":46,"baseCurrency":"MXN","baseAmount":1000,"quoteCurrency":"USDC","quoteAmount":58.47,"quoteRate":null,"quoteRateInverse":null,"isExpired":false,"expiresAt":"2024-01-10T23:06:08.388000Z"},"network":"POLYGON"}',
  //     );
  //     expect(navigate).toHaveBeenCalledWith('/ramp');
  //   });
  // });

  // it('should handle an error when backend fails', async () => {
  //   (axios.post as jest.Mock).mockRejectedValue({});
  //   render(<RampForm />, { wrapper });

  //   const baseAmountInput = screen.getByLabelText('baseAmount') as HTMLInputElement;
  //   const quoteAmountInput = screen.getByLabelText('quoteAmount') as HTMLInputElement;
  //   const submitBtn = screen.getByRole('button', { name: 'Continuar' });
  //   await userEvent.type(baseAmountInput, '1000');

  //   userEvent.click(submitBtn);

  //   await waitFor(() => {
  //     expect(quoteAmountInput.value).toBe('0');
  //     expect(localStorage.setItem).not.toHaveBeenCalledWith();
  //     expect(navigate).not.toHaveBeenCalledWith('/ramp');
  //   });
  // });

  // it('should make a request for a quote when typing a new value', async () => {
  //   render(<RampForm />, { wrapper });

  //   const baseAmountInput = screen.getByLabelText('baseAmount') as HTMLInputElement;
  //   const quoteAmountInput = screen.getByLabelText('quoteAmount') as HTMLInputElement;
  //   await userEvent.type(baseAmountInput, '1000');

  //   await waitFor(() => {
  //     expect(quoteAmountInput.value).toBe('58.47');
  //   });
  // });
});
