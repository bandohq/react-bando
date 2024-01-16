import axios, { AxiosResponse } from 'axios';
import { User } from '@hooks/useUser/MagicUserProvider';

type GetUserDataRequest = (endpoint: string) => Promise<Partial<User> | string | AxiosResponse>;
export const getUserData: GetUserDataRequest = (endpoint) =>
  axios
    .get(endpoint)
    .then(({ data }) => ({
      id: data.id,
      kycLevel: data.kyc_level,
      externalId: data.external_id,
      firstName: data.first_name,
      lastName: data.last_name,
      killbId: data.killb_id,
      dateOfBirth: data.date_of_birth,
      phone: data.phone,
      nationalIdNumber: data.national_id_number,
    }))
    .catch((error) => {
      if (error.response.data.success) return Promise.resolve('auth valid');
      throw new Error('auth invalid');
    });
