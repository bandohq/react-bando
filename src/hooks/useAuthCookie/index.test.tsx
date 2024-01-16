import '@config/axios';
import { renderHook, waitFor } from '@testing-library/react';
import Cookies from 'js-cookie';

import useAuthCookie from '.';

jest.mock('js-cookie');

describe('useAuthCookie', () => {
  it('returns the jwt token and isAuthenticated flag if token is present', async () => {
    (Cookies.get as jest.Mock).mockImplementation(() => 'jwt');

    const { result } = renderHook(useAuthCookie);

    await waitFor(() => {
      expect(result.current.isAuthenticated).toBeTrue();
      expect(result.current.token).toBeString();
    });
  });

  it('returns jwt values when token is not present', async () => {
    (Cookies.get as jest.Mock).mockImplementation(() => undefined);

    const { result } = renderHook(useAuthCookie);

    await waitFor(() => {
      expect(result.current.isAuthenticated).toBeFalse();
      expect(result.current.token).toBeUndefined();
    });
  });
});
