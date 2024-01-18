import { render, screen } from '@testing-library/react';
import ErrorBox from '.';

describe('ErrorBox', () => {
  it('should render ErrorBox ', async () => {
    render(<ErrorBox aria-label="error-box">Error message</ErrorBox>);
    screen.getByLabelText('error-box');
    screen.getByText('Error message');
  });
});
