import { render, screen } from '@testing-library/react';
import wrapper from '@helpers/TestProvider';

import LandingLayout from '.';

describe('LandingLayout', () => {
  it('should render ', () => {
    render(
      <LandingLayout>
        <div>Layout content</div>
      </LandingLayout>,
      { wrapper },
    );

    screen.getByText('Layout content');
  });
});
