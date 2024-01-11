import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { setupServer } from 'msw/node';
import { http } from 'msw';
import env from '@config/env';
import './axios';

jest.mock('js-cookie');
jest.mock('jwt-decode');

describe('Axios', () => {
  const remove = jest.fn();
  const server = setupServer();
  // http.get(`${env.api}/test`, (req, res, ctx) =>
  //   res(ctx.status(200), ctx.set({ Authorization: req.headers.get('authorization') || '' })),
  // ),

  beforeAll(() => {
    Cookies.remove = remove;
    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  beforeEach(() => {
    // (jwtDecode as jest.Mock).mockImplementation(() => ({ acl: null }));
  });

  test('interceptor is requesting the auth cookie', async () => {
    const response = await axios.get('/test');

    expect(Cookies.get).toHaveBeenCalled();
    expect(response.status).toBe(200);
    expect(response.headers.authorization).toBeUndefined();
  });

  test('headers are set correctly when token is present', async () => {
    (Cookies.get as jest.Mock).mockImplementation(() => 'tokenizer');

    const response = await axios.get('/test');
    expect(response.headers.authorization).toBe('Bearer tokenizer');
  });

  it('it handles the 401 error correctly', async () => {
    server.use(rest.get(`${env.api}/401`, (_, res, ctx) => res(ctx.status(401))));

    try {
      await axios.get('/401');
    } catch (error) {
      expect(remove).toHaveBeenCalledTimes(1);
      expect((error as AxiosError).message).toBe('Request failed with status code 401');
    }
  });

  it('it handles the 401 error correctly when localStorage is available for partner_id', async () => {
    server.use(rest.get(`${env.api}/401`, (_, res, ctx) => res(ctx.status(401))));

    const spyLocal = jest.spyOn(localStorage, 'removeItem');
    jest.spyOn(localStorage, 'getItem').mockImplementation(() => 'partner');

    try {
      await axios.get('/401');
    } catch (error) {
      expect(remove).toHaveBeenCalledTimes(1);
      expect(spyLocal).toHaveBeenCalledWith('partner_id');
      expect(window.location.href).toBe('/login?partner_id=partner');
      expect((error as AxiosError).message).toBe('Request failed with status code 401');
    }
  });

  it('handles 401 for an UBO user and redirects them to /expired route with the jwt in the header', async () => {
    (jwtDecode as jest.Mock).mockImplementation(() => ({ acl: 'uua' }));
    (Cookies.get as jest.Mock).mockImplementation(() => 'tokenizer');

    server.use(rest.get(`${env.api}/401`, (_, res, ctx) => res(ctx.status(401))));

    try {
      await axios.get('/401');
    } catch (error) {
      expect(remove).toHaveBeenCalledTimes(1);
      expect(window.location.href).toBe('/expired?token=tokenizer');
      expect((error as AxiosError).message).toBe('Request failed with status code 401');
    }
  });
});
