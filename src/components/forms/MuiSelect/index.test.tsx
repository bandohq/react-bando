import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import wrapper from '@helpers/TestProvider';

import MuiSelect from '.';
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

describe('MuiSelect', () => {
  it('should render select with label', async () => {
    render(<MuiSelect label="Recibes" id="moneyReceived" defaultValue="mxn" items={items} />, {
      wrapper,
    });
    screen.getByLabelText('moneyReceived');
  });

  it('should render select with label and be identifiebla by name', async () => {
    render(<MuiSelect label="Recibes" name="moneyReceived" defaultValue="mxn" items={items} />, {
      wrapper,
    });
    screen.getByLabelText('moneyReceived');
  });

  it('changes value from select', async () => {
    const { container } = render(
      <MuiSelect
        label="Recibes"
        name="select-moneyReceived"
        id="moneyReceived"
        defaultValue="mxn"
        items={items}
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
