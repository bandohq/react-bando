import { render, screen } from '@testing-library/react';
import wrapper from '@helpers/TestProvider';

import EmptyLayout from '.';

describe('EmptyLayout', () => {
  it('should render ', () => {
    render(
      <EmptyLayout>
        <div>Layout container</div>
      </EmptyLayout>,
      { wrapper },
    );

    screen.getByText('Layout container');
  });
});
