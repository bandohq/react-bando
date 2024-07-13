import { fetchAndActivate, getAll, getRemoteConfig } from 'firebase/remote-config';

import getConfigsFromFirebase from './remoteConfig';

describe('remoteConfig', () => {
  beforeEach(() => {
    (getRemoteConfig as jest.Mock).mockReturnValue({ settings: {} });
    (fetchAndActivate as jest.Mock).mockResolvedValue(true);
    (getAll as jest.Mock).mockReturnValue({
      USE_GOOGLE_AUTOCOMPLETE: { asBoolean: jest.fn().mockImplementation(() => true) },
    });
  });

  it('should fetch firebase remote config values', async () => {
    const configs = await getConfigsFromFirebase();
    expect(configs.useGoogleAutocomplete).toBeTrue();
  });
});
