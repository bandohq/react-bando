import Tap from '@tapfiliate/tapfiliate-js';
import env from './env';

export default function initTapfiliate() {
  Tap.init(env.tapfiliateAccountId);
  Tap.detect();
}

export function tapfiliateConversion(
  id: string | number,
  amount: number | string,
  options?: Record<string, unknown>,
) {
  Tap.conversion(id, amount, options);
}
