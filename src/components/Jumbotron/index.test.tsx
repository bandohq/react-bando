import { render, screen } from '@testing-library/react';
import wrapper from '@helpers/TestProvider';

import Jumbotron from '.';

describe('Jumbotron', () => {
  it('should render ', () => {
    render(<Jumbotron />, { wrapper });
    screen.getByText('Intercambia entre MXN y cripto en un SPEI');
  });
});
