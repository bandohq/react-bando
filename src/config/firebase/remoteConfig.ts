import { getRemoteConfig, fetchAndActivate, getAll } from 'firebase/remote-config';
import { minutesToMilliseconds } from 'date-fns';

export interface AppConfig {
  useGoogleAutocomplete: boolean;
}

const fiveMinInMilis = minutesToMilliseconds(5);

const getConfigsFromFirebase = async () => {
  const remoteConfig = getRemoteConfig();
  remoteConfig.settings = {
    ...remoteConfig?.settings,
    minimumFetchIntervalMillis: fiveMinInMilis,
  };

  await fetchAndActivate(remoteConfig);
  const values = getAll(remoteConfig);

  return {
    useGoogleAutocomplete: values.USE_GOOGLE_AUTOCOMPLETE.asBoolean(),
  } as AppConfig;
};

export default getConfigsFromFirebase;
