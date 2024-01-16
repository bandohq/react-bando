import * as yup from 'yup';
import { isAddress } from 'web3-validator';

export type ConfirmRampFormValues = {
  address: string;
};

const schema = yup.object().shape({
  address: yup
    .string()
    .test(
      'is-valid-address',
      () => 'La dirección es incorrecta',
      (value) => isAddress(value ?? ''),
    )
    .required(),
});

export default schema;
