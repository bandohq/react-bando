import { render, screen } from '@testing-library/react';
import SimpleFooter from '@components/SimpleFooter';
import wrapper from '@helpers/TestProvider';

describe('SimpleFooter', () => {
  it('renders with default props', () => {
    render(<SimpleFooter />, { wrapper });

    screen.getByText(/Bando. Todos los derechos reservados./i);
  });

  it('renders with custom background color', () => {
    const { container } = render(<SimpleFooter bgColor="red" />, { wrapper });

    expect(container.firstChild).toHaveStyle('background-color: red');
  });

  it('renders with custom text color', () => {
    const { getByText } = render(<SimpleFooter textColor="blue" />, { wrapper });
    const footerText = getByText(/Bando. Todos los derechos reservados./i);
    expect(footerText).toHaveStyle('color: blue');
  });
});
