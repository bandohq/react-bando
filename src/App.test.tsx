import { render, screen } from '@testing-library/react';
import App from 'App';

describe('App', () => {
  it('should render App component without crashing', () => {
    render(<App />);
    expect(screen.getAllByText('Empieza Hoy')).toHaveLength(2);
  });
});
