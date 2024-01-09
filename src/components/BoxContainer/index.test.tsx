import { render, screen } from '@testing-library/react';
import BoxContainer from '.';

describe('BoxContainer', () => {
  it('should render BoxContainer ', async () => {
    render(<BoxContainer aria-label="container-box">Page content</BoxContainer>);
    screen.getByLabelText('container-box');
    screen.getByText('Page content');
  });
});
