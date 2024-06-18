import { render, screen, fireEvent } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import { PropsWithChildren } from 'react';
import Wrapper from '@helpers/TestProvider';

import Navbar from '.';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

const wrapper = ({ children }: PropsWithChildren) => (
  <Wrapper>
    <div style={{ width: '1500px', height: '2000px' }}>{children}</div>
  </Wrapper>
);

describe('Navbar', () => {
  const navigate = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(navigate);
  });

  it('should render the navbar and change the navbar classname based on the scroll position', async () => {
    render(<Navbar />, { wrapper });

    screen.getByLabelText('Bando logo');
    screen.getByLabelText('scrollTop');

    fireEvent.scroll(window, { target: { scrollY: 2000 } });
    screen.getByLabelText('scrolled');
  });
});
