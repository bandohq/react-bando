import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import wrapper from '@helpers/TestProvider';

import Select from '.';
import { CurrencyImg } from '../GetQuoteForm';
import Currency from '../../../assets/currency.svg';

const items = [
  {
    label: 'MXN',
    value: 'mxn',
    startComponent: <CurrencyImg src={Currency} />,
  },
  {
    label: 'USD',
    value: 'usd',
    startComponent: <CurrencyImg src={Currency} />,
  },
];

describe('Select', () => {
  it('should render select with label and help text', async () => {
    render(
      <Select
        label="Recibes"
        id="moneyReceived"
        defaultValue="mxn"
        items={items}
        helpText={
          <>
            Tipo de cambio (USDT/MXN): <strong>16.83</strong>
          </>
        }
      />,
      { wrapper },
    );
    screen.getByLabelText('moneyReceived');
    screen.getByText('Tipo de cambio (USDT/MXN):');
  });

  it('changes value from select', async () => {
    const { container } = render(
      <Select
        label="Recibes"
        name="select-moneyReceived"
        id="moneyReceived"
        defaultValue="mxn"
        items={items}
        helpText={
          <>
            Tipo de cambio (USDT/MXN): <strong>16.83</strong>
          </>
        }
      />,
      { wrapper },
    );

    const selectBox = screen.getByRole('combobox');
    const selectInput = within(container).getByDisplayValue('mxn') as HTMLInputElement;
    expect(selectInput.value).toBe('mxn');

    await userEvent.click(selectBox);
    const options = screen.getAllByRole('option');

    await userEvent.click(options[1]);
    expect(selectInput.value).toBe('usd');
  });
});
