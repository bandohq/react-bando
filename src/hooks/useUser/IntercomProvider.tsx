import Intercom from '@intercom/messenger-js-sdk';
import { PropsWithChildren, useEffect } from 'react';
import { User } from './types';

type IntercomProviderProps = PropsWithChildren & {
  user: Partial<User> | null;
};

export default function IntercomProvider({ children, user }: IntercomProviderProps) {
  // NOTE: Boot Intercom on app start
  useEffect(() => {
    Intercom({ app_id: 'gtz8x9mh' });
  }, []);

  // NOTE: Set or unset User data on Intercom
  useEffect(() => {
    if (!user) {
      Intercom({ app_id: 'gtz8x9mh', email: '', name: '', id: '' });
    } else {
      Intercom({
        app_id: 'gtz8x9mh',
        ...(user.email && { email: user.email }),
        ...(user.id && { user_id: String(user.id) }),
        ...(user.firstName && { name: [user?.firstName, user.lastName].join(' ') }),
        // created_at: // TODO: Define what to send here
      });
    }
  }, [user]);

  return <>{children}</>;
}
