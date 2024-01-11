describe('enviroment variables', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = {
      ...OLD_ENV,
    };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  it('should set an empty string when env variables are not present', () => {
    process.env.API = undefined;
    process.env.AUTH_COOKIE_NAME = undefined;

    import('./env').then(({ default: env }) => {
      expect(env.api).toBe('');
      expect(env.authCookieName).toBe('');
    });
  });

  it('should set the env variables when they are present', () => {
    import('./env').then(({ default: env }) => {
      expect(env.api).toBe('https://api.com');
      expect(env.authCookieName).toBe('bando_test');
    });
  });
});
