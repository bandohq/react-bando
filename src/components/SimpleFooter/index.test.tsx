import { render } from '@testing-library/react';
import SimpleFooter from '@components/SimpleFooter';
import wrapper from '@helpers/TestProvider';

describe('SimpleFooter', () => {
  it('renders with default props', () => {
    const { getByText, container } = render(<SimpleFooter />, { wrapper });
    const text = getByText(/Bando. Todos los derechos reservados./i);
    expect(text).toBeInTheDocument();
    expect(container.firstChild).toHaveStyle('background-color: rgb(25, 118, 210)');
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
