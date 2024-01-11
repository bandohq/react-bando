import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import wrapper from '@helpers/TestProvider';

import Input, { HelpText } from '.';

describe('Input', () => {
  it('should render input with label and help text', async () => {
    render(
      <Input
        label="Recibes"
        id="moneyReceived"
        type="number"
        helpText={
          <>
            Tipo de cambio (USDT/MXN): <strong>16.83</strong>
          </>
        }
        disabled
      />,
      { wrapper },
    );
    screen.getByLabelText('Recibes');
    screen.getByText('Tipo de cambio (USDT/MXN):');
  });

  it('should change the value of the input', async () => {
    render(<Input label="Text Input" id="textInput" type="text" placeholder="textInput" />, {
      wrapper,
    });

    const input = screen.getByPlaceholderText('textInput') as HTMLInputElement;
    await userEvent.type(input, 'new text value');
    expect(input.value).toBe('new text value');
  });

  it('mantainLabel should hide label element when false', async () => {
    render(
      <Input
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

  describe('HelpText component', () => {
    it('should render HelpText component', () => {
      render(<HelpText>Help text</HelpText>, { wrapper });
      screen.getByText('Help text');
    });
  });
});
