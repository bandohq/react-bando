import { useContext, createContext } from 'react';
import { AppConfig } from '@config/firebase/remoteConfig';

export const remoteConfigContext = createContext<AppConfig | null>(null);
export const { Provider } = remoteConfigContext;

export default function useRemoteConfig() {
  const configs = useContext(remoteConfigContext) as AppConfig;
  return { configs };
}
