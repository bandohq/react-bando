import { render, screen } from '@testing-library/react';
import TestProvider from '@helpers/TestProvider';
import App from 'App';

describe('App', () => {
  it('should render App component without crashing', () => {
    render(<App />, { wrapper: TestProvider });
    expect(
      screen.getAllByText(/Con Bando entra y sal del mundo cripto en segundos con SPEI/i),
    ).toHaveLength(1);
  });
});
