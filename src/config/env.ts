const api = process.env.API || '';
const authCookieName = process.env.AUTH_COOKIE_NAME || '';
const rampDataLocalStorage = 'bando_ramp_data';
const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY ?? '';
const intercomAppId = process.env.INTERCOM_APP_ID ?? '';

const magicLink = {
  secret: process.env.MAGIC_LINK_SECRET || '',
  rpcUrl: process.env.MAGIC_LINK_RPC_URL || '<https://rpc2.sepolia.org/>',
  chainID: parseInt(process.env.MAGIC_LINK_CHAIN_ID || '11155111', 10),
};

export default {
  api,
  authCookieName,
  magicLink,
  rampDataLocalStorage,
  googleMapsApiKey,
  intercomAppId,
};
