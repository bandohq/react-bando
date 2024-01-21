import { rfcRegex } from '@helpers/rfcValidator';
import * as yup from 'yup';

export type KycFormValues = {
  firstName: string;
  lastName: string;
  phone: string;
  rfc: string;
  address: string;
};

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  phone: yup.string().required(),
  rfc: yup.string().required('RFC es requerido').matches(rfcRegex, 'RFC Inválido'),
  address: yup.string().required(),
});

export default schema;
