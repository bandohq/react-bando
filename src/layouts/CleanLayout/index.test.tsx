import { render, screen } from '@testing-library/react';
import wrapper from '@helpers/TestProvider';

import CleanLayout from '.';

describe('CleanLayout', () => {
  it('should render ', () => {
    render(
      <CleanLayout>
        <div>Layout container</div>
      </CleanLayout>,
      { wrapper },
    );

    screen.getByText('Layout container');
  });
});
