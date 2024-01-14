const api = process.env.API || '';
const authCookieName = process.env.AUTH_COOKIE_NAME || '';

const magicLink = {
  secret: process.env.MAGIC_LINK_SECRET || '',
  rpcUrl: process.env.MAGIC_LINK_RPC_URL || '',
  chainID: parseInt(process.env.MAGIC_LINK_CHAIN_ID || '1', 10),
};

export default { api, authCookieName, magicLink };
