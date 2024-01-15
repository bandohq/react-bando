import { PropsWithChildren, createContext, useEffect, useCallback, useState } from 'react';
import useMagic from '@hooks/useMagic';

export type User = {
  id: number;
  kycLevel: number;
  email: string;
  publicAddress: string;
  externalId: string;
  firstName: string;
  lastName: string;
  killbId: string;
  dateOfBirth: string;
  phone: string;
  nationalIdNumber: string;
};

export type UserContextType = {
  user: Partial<User> | null;
  fetchUser: () => Promise<void>;
  logoutUser: () => Promise<void>;
  setUser: (userData: Partial<User>) => void;
  isLoading: boolean;
  dataLoaded: boolean;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  fetchUser: async () => {},
  logoutUser: async () => {},
  setUser: () => {},
  isLoading: false,
  dataLoaded: false,
});

const MagicUserProvider = ({ children }: PropsWithChildren) => {
  const { magic } = useMagic();
  const [user, setUser] = useState<Partial<User> | null>(null);
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const logoutUser = async () => {
    await magic?.user.logout();
  };

  const setUserData = useCallback(
    (userData: Partial<User>) => setUser((prevUser) => ({ ...prevUser, ...userData })),
    [setUser],
  );

  const fetchUser = useCallback(async () => {
    if (magic) {
      try {
        setIsLoading(true);
        const userInfo = (await magic?.user.getInfo()) as Partial<User>;
        setUserData({ email: userInfo?.email, publicAddress: userInfo?.publicAddress });
        setDataLoaded(true);
      } finally {
        setIsLoading(false);
      }
    }
  }, [magic, setIsLoading, setUserData, setDataLoaded]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser, magic]);

  return (
    <UserContext.Provider
      value={{ user, fetchUser, logoutUser, isLoading, dataLoaded, setUser: setUserData }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default MagicUserProvider;
