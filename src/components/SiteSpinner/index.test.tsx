import { render, screen } from '@testing-library/react';
import wrapper from '@helpers/TestProvider';

import SiteSpinner from '.';

describe('SiteSpinner', () => {
  it('should render ', () => {
    render(<SiteSpinner />, { wrapper });

    screen.getByRole('progressbar');
  });
});
