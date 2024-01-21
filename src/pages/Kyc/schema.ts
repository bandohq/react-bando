import { rfcRegex } from '@helpers/rfcValidator';
import * as yup from 'yup';

export type KycFormValues = {
  type: string;
  firstName: string;
  lastName: string;
  phone: string;
  nationalIdNumber: string;
  address: {
    label: string;
    street: string;
    city: string;
    zip: string;
    country: string;
  };
  document: {
    type: string;
    number: string;
    country: string;
  };
};

const schema = yup.object().shape({
  type: yup.string().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  phone: yup.string().required(),
  nationalIdNumber: yup.string().required('RFC es requerido').matches(rfcRegex, 'RFC Inválido'),
  address: yup.object().shape({
    label: yup.string().required(),
    street: yup.string().required(),
    city: yup.string().required(),
    zip: yup.string().required(),
    country: yup.string().required(),
  }),
  document: yup.object().shape({
    type: yup.string().required(),
    number: yup.string().required(),
    country: yup.string().required(),
  }),
});

export default schema;
