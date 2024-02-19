import { render, screen, fireEvent } from '@testing-library/react';
import { useNavigate, BrowserRouter } from 'react-router-dom';

import Navbar from '.';
import { PropsWithChildren } from 'react';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

const Container = ({ children }: PropsWithChildren) => (
  <BrowserRouter>
    <div style={{ width: '1500px', height: '2000px' }}>{children}</div>
  </BrowserRouter>
);

describe('Navbar', () => {
  const navigate = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(navigate);
  });

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
