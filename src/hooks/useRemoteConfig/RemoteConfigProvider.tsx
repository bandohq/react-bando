import { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { default as getConfigs, AppConfig } from '@config/firebase/remoteConfig';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import { Provider } from '.';

const RemoteConfigProvider = ({ children }: PropsWithChildren) => {
  const [configs, setConfigs] = useState<AppConfig | null>(null);

  const fetchConfigs = useCallback(async () => {
    try {
      const fetchedConfigs = await getConfigs();
      setConfigs(fetchedConfigs);
    } catch {
      setConfigs(null);
    }
  }, []);

  useEffect(() => {
    fetchConfigs();
  }, [fetchConfigs]);

  if (!configs) {
    return (
      <Box
        data-testid="configs-loader"
        sx={{ p: 2, display: 'flex', justifyContent: 'center', width: '100%', height: '100%' }}
      >
        <CircularProgress
          size={25}
          sx={{ color: 'ink.i500' }}
          aria-label="loading firebase configs"
        />
      </Box>
    );
  }

  return <Provider value={configs}>{children}</Provider>;
};

export default RemoteConfigProvider;
