import { render, screen } from '@testing-library/react';
import wrapper from '@helpers/TestProvider';

import KycBulletPoints from '.';

describe('KycBulletPoints', () => {
  it('should render ', () => {
    render(<KycBulletPoints />, { wrapper });

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(4);
  });
});
