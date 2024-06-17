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
  logoutUser: () => Promise<void | string>;
  setUser: (userData: Partial<User>) => void;
  resetUser: () => void;
  isLoading: boolean;
  dataLoaded: boolean;
};
