import { render, screen, waitFor } from '@testing-library/react';

import { default as getConfigs } from '@config/firebase/remoteConfig';
import { PropsWithChildren } from 'react';

import RemoteConfigProvider from './RemoteConfigProvider';
import { ThemeProvider } from '@mui/material';
import theme from '@config/theme.ts';

const ChildComp = () => <div>App has rendered!</div>;

const wrapper = ({ children }: PropsWithChildren) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

jest.mock('@config/firebase/remoteConfig');

describe('RemoteConfigProvider', () => {
  beforeEach(() => {
    (getConfigs as jest.Mock).mockResolvedValue({ api: 'api' });
  });

  it('should show a loader when remote configs have not loaded', () => {
    render(
      <RemoteConfigProvider>
        <ChildComp />
      </RemoteConfigProvider>,
      { wrapper },
    );

    expect(() => screen.getByText('App has rendered!')).toThrow();
    expect(screen.getByTestId('configs-loader')).toBeInTheDocument();
  });

  it('should show app when configs have loaded', async () => {
    render(
      <RemoteConfigProvider>
        <ChildComp />
      </RemoteConfigProvider>,
      { wrapper },
    );

    await waitFor(() => {
      screen.getByText('App has rendered!');
      expect(() => screen.getByTestId('configs-loader')).toThrow();
    });
  });

  it('should mantain loader when getting the configs fails', async () => {
    (getConfigs as jest.Mock).mockRejectedValue('oops');

    render(
      <RemoteConfigProvider>
        <ChildComp />
      </RemoteConfigProvider>,
      { wrapper },
    );

    expect(() => screen.getByText('App has rendered!')).toThrow();
    expect(screen.getByTestId('configs-loader')).toBeInTheDocument();

    await waitFor(() => {
      expect(() => screen.getByText('App has rendered!')).toThrow();
      expect(screen.getByTestId('configs-loader')).toBeInTheDocument();
    });
  });
});
