import { render, screen } from '@testing-library/react';
import wrapper from '@helpers/TestProvider';
import Hr from '.';

describe('Hr', () => {
  it('should render Hr', () => {
    render(<Hr aria-label="HR element" />, { wrapper });
    screen.getByLabelText('HR element');
  });
});
