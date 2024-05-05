import { rfcRegex } from '@helpers/regexValidators';
import { isPhoneValid } from '@helpers/phoneValidation';

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
  firstName: yup.string().required('El nombre es requerido'),
  lastName: yup.string().required('El apellido es requerido'),
  phone: yup.string().required('El télefono es requerido')
    .test('phone', 'Número de teléfono inválido', (value) => isPhoneValid(value)),
  nationalIdNumber: yup.string().required('RFC es requerido').matches(rfcRegex, 'RFC Inválido'),
  address: yup.object().shape({
    label: yup.string().required('Tu domicilio es requerido'),
    street: yup.string().required(),
    city: yup.string().required(),
    zip: yup.string().required(),
    country: yup.string().required(),
  }),
  document: yup.object().shape({
    type: yup.string().required(),
    number: yup.string().required('El número de documento es requerido'),
    country: yup.string().required(),
  }),
});

export default schema;
