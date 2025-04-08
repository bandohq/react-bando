import { Magic } from 'magic-sdk';
import { ReactNode, createContext, useEffect, useMemo, useState } from 'react';
import env from '@config/env';

type MagicContextType = {
  magic: Magic | null;
};

export const MagicContext = createContext<MagicContextType>({
  magic: null,
});

const MagicProvider = ({ children }: { children: ReactNode }) => {
  const [magic, setMagic] = useState<Magic | null>(null);

  useEffect(() => {
    console.log('env.magicLink.secret', env.magicLink.secret);
    if (env.magicLink.secret) {
      const magic = new Magic(env.magicLink.secret);

      setMagic(magic);
    }
  }, []);

  const value = useMemo(() => {
    return {
      magic,
    };
  }, [magic]);

  return <MagicContext.Provider value={value}>{children}</MagicContext.Provider>;
};

export default MagicProvider;
