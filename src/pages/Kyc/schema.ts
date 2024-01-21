import { rfcRegex } from '@helpers/rfcValidator';
import * as yup from 'yup';

export type KycFormValues = {
  firstName: string;
  lastName: string;
  phone: string;
  rfc: string;
  address: {
    label: string;
    street: string;
    city: string;
    zip: string;
    country: string;
  };
};

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  phone: yup.string().required(),
  rfc: yup.string().required('RFC es requerido').matches(rfcRegex, 'RFC Inválido'),
  address: yup.object().shape({
    label: yup.string().required(),
    street: yup.string().required(),
    city: yup.string().required(),
    zip: yup.string().required(),
    country: yup.string().required(),
  }),
});

export default schema;
