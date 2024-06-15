import axios, { AxiosResponse } from 'axios';

type PostUserKycArgs = {
  email: string;
  type: string;
  firstName: string;
  lastName: string;
  phone: string;
  dateOfBirth?: string;
  address: {
    street: string;
    state: string;
    zip: string;
    country: string;
  };
  nationalIdNumber: string;
  document: {
    type: string;
    number: string;
    country: string;
  };
  acceptedNotifications?: boolean | undefined;
};
type PostUserKycRequest = (
  endpoint: string,
  data: { arg: PostUserKycArgs },
) => Promise<AxiosResponse>;

export const postUserKyc: PostUserKycRequest = (endpoint, { arg }) =>
  axios.post(endpoint, {
    type: arg.type,
    email: arg.email,
    first_name: arg.firstName,
    last_name: arg.lastName,
    phone: arg.phone,
    date_of_birth: arg.dateOfBirth ?? '1990-12-14',
    address: {
      street: arg.address.street,
      city: arg.address.state,
      zip: arg.address.zip,
      country: arg.address.country,
    },
    national_id_number: arg.nationalIdNumber,
    document: arg.document,
    accepted_notifications: arg.acceptedNotifications,
  });
