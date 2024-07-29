import Tap from '@tapfiliate/tapfiliate-js';
import * as Sentry from '@sentry/react';

import env from './env';

export default function initTapfiliate() {
  try {
    Tap.init(env.tapfiliateAccountId);
    Tap.detect();
  } catch (err) {
    // NOTE: Notify Sentry of error
    Sentry.captureException(err);
  }
}

export function tapfiliateConversion(
  id: string | number,
  amount: number | string,
  options?: Record<string, unknown>,
) {
  Tap.conversion(id, amount, options);
}
