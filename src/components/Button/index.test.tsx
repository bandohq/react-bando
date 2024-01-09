import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import BandoButton from '.';

describe('BandoButton', () => {
  const onClick = jest.fn();

  it('should render button and trigger onClick action', async () => {
    render(<BandoButton onClick={onClick}>Click me</BandoButton>);
    const btn = screen.getByRole('button', { name: /Click me/i });

    await userEvent.click(btn);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
