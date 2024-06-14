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
    label?: yup.Maybe<string | undefined>;
    street: string;
    state: string;
    zip: string;
    country: string;
    neighborhood: string;
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
  phone: yup
    .string()
    .required('El télefono es requerido')
    .test('phone', 'Número de teléfono inválido', (value) => isPhoneValid(value)),
  nationalIdNumber: yup.string().required('RFC es requerido').matches(rfcRegex, 'RFC Inválido'),
  address: yup.object().shape({
    label: yup.string().notRequired(),
    street: yup
      .string()
      .required('Tu calle, localidad, esquina, referencia, etc va en este campo.'),
    neighborhood: yup.string().required('La colonia o municipio en donde vives va en este campo.'),
    state: yup.string().required('El estado en donde vives va en este campo.'),
    zip: yup.string().required('El código postal de tu domicilio va en este campo.'),
    country: yup.string().required('El país es requerido.'),
  }),
  document: yup.object().shape({
    type: yup.string().required(),
    number: yup.string().required('El número de documento es requerido'),
    country: yup.string().required(),
  }),
});

export default schema;
