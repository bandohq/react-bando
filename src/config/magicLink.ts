import { Magic } from 'magic-sdk';
import env from './env';

export const magic = new Magic(env.magicLink.secret, {
  network: {
    rpcUrl: env.magicLink.rpcUrl,
    chainId: env.magicLink.chainID,
  },
});
