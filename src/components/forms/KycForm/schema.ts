import { rfcRegex } from '@helpers/regexValidators';
import { isPhoneValid } from '@helpers/phoneValidation';
import { TFunction } from 'i18next';

import * as yup from 'yup';

export type KycFormValues = {
  type: string;
  firstName: string;
  lastName: string;
  phone: string;
  nationalIdNumber: string;
  acceptedNotifications?: boolean | undefined;
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

const schema = (t: TFunction<'form', undefined>) =>
  yup.object().shape({
    type: yup.string().required(),
    firstName: yup.string().required(t('kyc.name')),
    lastName: yup.string().required(t('kyc.lastName')),
    acceptedNotifications: yup.boolean(),
    phone: yup
      .string()
      .required(t('kyc.phone'))
      .test('phone', t('kyc.phoneInvalid'), (value) => isPhoneValid(value)),
    nationalIdNumber: yup.string().required(t('kyc.rfc')).matches(rfcRegex, t('kyc.rfcInvalid')),
    address: yup.object().shape({
      label: yup.string().notRequired(),
      street: yup.string().required(t('kyc.street')),
      neighborhood: yup.string().required(t('kyc.neighborhood')),
      state: yup.string().required(t('kyc.state')),
      zip: yup.string().required(t('kyc.zip')),
      country: yup.string().required(t('kyc.country')),
    }),
    document: yup.object().shape({
      type: yup.string().required(),
      number: yup.string().required(t('kyc.document')),
      country: yup.string().required(),
    }),
  });

export default schema;
