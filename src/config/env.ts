const api = process.env.API || '';
const authCookieName = process.env.AUTH_COOKIE_NAME || '';

const magicLink = {
  secret: process.env.MAGIC_LINK_SECRET || '',
  repUrl: process.env.MAGIC_LINK_REP_URL || '',
  chainID: process.env.MAGIC_LINK_CHAIN_ID || '',
};

export default { api, authCookieName, magicLink };
