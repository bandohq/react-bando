import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import wrapper from '@helpers/TestProvider';

import MuiInput from '.';

describe('MuiInput', () => {
  it('should render input with label', async () => {
    render(<MuiInput label="Recibes" id="moneyReceived" type="number" disabled />, { wrapper });
    screen.getByLabelText('Recibes');
  });

  it('should change the value of the input', async () => {
    render(<MuiInput label="Text Input" id="textInput" type="text" placeholder="textInput" />, {
      wrapper,
    });

    const input = screen.getByPlaceholderText('textInput') as HTMLInputElement;
    await userEvent.type(input, 'new text value');
    expect(input.value).toBe('new text value');
  });

  it('mantainLabel should hide label element when false', async () => {
    render(
      <MuiInput
        id="textInput"
        type="text"
        placeholder="textInput"
        label="LabelText"
        mantainLabel={false}
      />,
      {
        wrapper,
      },
    );

    expect(() => screen.getByText('LabelText')).toThrow();
  });
});
