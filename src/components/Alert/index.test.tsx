import { render, screen } from '@testing-library/react';
import BandoAlert from '.';

describe('BandoAlert', () => {
  it('should render BandoInfoAlert', async () => {
    render(
      <BandoAlert
        text="This is an outlined info Alert."
        aria-label="info-box"
        variant="outlined"
        severity="info"
      />,
    );
    screen.getByText('This is an outlined info Alert.');
  });
});
