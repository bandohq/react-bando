import {
  PropsWithChildren,
  createContext,
  useEffect,
  useCallback,
  useContext,
  useState,
  useMemo,
} from 'react';
import useMagic from '@hooks/useMagic';
import { User, UserContextType } from './types';
import IntercomProvider from './IntercomProvider';

export const UserContext = createContext<UserContextType>({
  user: null,
  fetchUser: async () => {},
  logoutUser: async () => {},
  setUser: () => {},
  resetUser: () => {},
  isLoading: false,
  dataLoaded: false,
});

const MagicUserProvider = ({ children }: PropsWithChildren) => {
  const { magic } = useMagic();
  const [user, setUser] = useState<Partial<User> | null>(null);
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const setUserData = useCallback(
    (userData: Partial<User>) => {
      return setUser((prevUser) => ({ ...prevUser, ...userData }));
    },
    [setUser],
  );

  const resetUser = useCallback(() => setUser(null), [setUser]);

  const logoutUser = useCallback(async () => {
    try {
      await magic?.user?.logout();
      return 'ok';
    } catch {
      return 'error logging out';
    }
  }, [magic]);

  const fetchUser = useCallback(async () => {
    if (magic) {
      try {
        setIsLoading(true);
        const userInfo = (await magic?.user.getInfo()) as Partial<User>;
        setUserData({ email: userInfo?.email, publicAddress: userInfo?.publicAddress });
        setDataLoaded(true);
      } catch {
        // NOTE: Prevent internal user error from magic
      } finally {
        setIsLoading(false);
      }
    }
  }, [magic, setIsLoading, setUserData, setDataLoaded]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const contextValue = useMemo(
    () => ({
      user,
      fetchUser,
      logoutUser,
      isLoading,
      dataLoaded,
      setUser: setUserData,
      resetUser,
    }),
    [user, fetchUser, logoutUser, isLoading, dataLoaded, setUserData, resetUser],
  );

  return (
    <UserContext.Provider value={contextValue}>
      <IntercomProvider user={user}>{children}</IntercomProvider>
    </UserContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useMagicUser = () => useContext(UserContext);

export default MagicUserProvider;
