import { render, screen, fireEvent } from '@testing-library/react';

import Navbar from '.';
import { PropsWithChildren } from 'react';

const Container = ({ children }: PropsWithChildren) => (
  <div style={{ width: '1500px', height: '2000px' }}>{children}</div>
);

describe('Navbar', () => {
  it('should render the navbar and change the navbar classname based on the scroll position', async () => {
    render(
      <Container>
        <Navbar />
      </Container>,
    );

    screen.getByLabelText('Bando logo');
    screen.getByLabelText('scrollTop');

    fireEvent.scroll(window, { target: { scrollY: 2000 } });
    screen.getByLabelText('scrolled');
  });
});
