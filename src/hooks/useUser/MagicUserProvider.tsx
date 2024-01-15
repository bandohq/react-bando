import { PropsWithChildren, createContext, useEffect, useCallback, useState } from 'react';
import useMagic from '@hooks/useMagic';

type User = {
  email: string;
  publicAddress: string;
};

export type UserContextType = {
  user: User | null;
  fetchUser: () => Promise<void>;
  logoutUser: () => Promise<void>;
  isLoading: boolean;
  dataLoaded: boolean;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  fetchUser: async () => {},
  logoutUser: async () => {},
  isLoading: false,
  dataLoaded: false,
});

const MagicUserProvider = ({ children }: PropsWithChildren) => {
  const { magic } = useMagic();
  const [user, setUser] = useState<User | null>(null);
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const logoutUser = async () => {
    await magic?.user.logout();
  };

  const fetchUser = useCallback(async () => {
    if (magic) {
      try {
        setIsLoading(true);
        const userInfo = (await magic?.user.getInfo()) as User;
        setUser({ email: userInfo?.email, publicAddress: userInfo?.publicAddress });
        setDataLoaded(true);
      } finally {
        setIsLoading(false);
      }
    }
  }, [magic, setIsLoading, setUser, setDataLoaded]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser, magic]);

  return (
    <UserContext.Provider value={{ user, fetchUser, logoutUser, isLoading, dataLoaded }}>
      {children}
    </UserContext.Provider>
  );
};

export default MagicUserProvider;
