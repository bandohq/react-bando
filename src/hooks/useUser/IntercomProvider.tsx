import Intercom from '@intercom/messenger-js-sdk';
import { PropsWithChildren, useEffect } from 'react';
import env from '@config/env';
import { User } from './types';

type IntercomProviderProps = PropsWithChildren & {
  user: Partial<User> | null;
};

export default function IntercomProvider({ children, user }: IntercomProviderProps) {
  // NOTE: Boot Intercom on app start
  useEffect(() => {
    Intercom({ app_id: env.intercomAppId });
  }, []);

  // NOTE: Set or unset User data on Intercom
  useEffect(() => {
    if (!user) {
      Intercom({ app_id: env.intercomAppId, email: '', name: '', id: '' });
    } else {
      Intercom({
        app_id: env.intercomAppId,
        ...(user.email && { email: user.email }),
        ...(user.id && { user_id: String(user.id) }),
        ...(user.firstName && { name: [user?.firstName, user.lastName].join(' ') }),
        // created_at: // TODO: Define what to send here
      });
    }
  }, [user]);

  return <>{children}</>;
}
