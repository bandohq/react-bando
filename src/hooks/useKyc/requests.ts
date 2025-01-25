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
    city: string;
    zip: string;
    country: string;
  };
  nationalIdNumber: string;
  document: {
    type: string;
    number: string;
    country: string;
    cic?: string | undefined;
    identificadorCiudadano?: string | undefined;
    ocr?: string | undefined;
    numeroEmision?: string | undefined;
  };
  acceptedNotifications?: boolean | undefined;
};
type PostUserKycRequest = (
  endpoint: string,
  data: { arg: PostUserKycArgs },
) => Promise<AxiosResponse>;

type DocumentPayload = {
  type: string;
  number: string;
  issued_country_code: string;
  cic?: string | undefined;
  identificadorCiudadano?: string | undefined;
  ocr?: string | undefined;
  numeroEmision?: string | undefined;
};

export const postUserKyc: PostUserKycRequest = (endpoint, { arg }) => {
  const documentArgs: DocumentPayload = {
    type: arg.document.type,
    number: arg.document.number,
    issued_country_code: arg.document.country,
  };
  if (arg.document.cic) documentArgs.cic = arg.document.cic;
  if (arg.document.identificadorCiudadano)
    documentArgs.identificadorCiudadano = arg.document.identificadorCiudadano;
  if (arg.document.ocr) documentArgs.ocr = arg.document.ocr;
  if (arg.document.numeroEmision) documentArgs.numeroEmision = arg.document.numeroEmision;
  return axios.post(endpoint, {
    type: arg.type,
    email: arg.email,
    first_name: arg.firstName,
    last_name: arg.lastName,
    phone: arg.phone,
    date_of_birth: arg.dateOfBirth ?? '1990-12-14',
    address: {
      street: arg.address.street,
      state: arg.address.state,
      city: arg.address.city,
      zip: arg.address.zip,
      country: arg.address.country,
    },
    national_id_number: arg.nationalIdNumber,
    document: documentArgs,
    accepted_notifications: arg.acceptedNotifications,
  });
};
