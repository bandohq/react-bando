import { render, screen } from '@testing-library/react';
import wrapper from '@helpers/TestProvider';

import ColumnLayout from '.';

describe('ColumnLayout', () => {
  it('should render ', () => {
    render(
      <ColumnLayout
        rightContent={<div>Right content</div>}
        leftContent={<div>Left content</div>}
      />,
      { wrapper },
    );

    screen.getByText('Right content');
    screen.getByText('Left content');
  });
});
