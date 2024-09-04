import i18n from 'translations';

export enum Identifications {
  NATIONAL_IDENTITY_CARD = 'NATIONAL_IDENTITY_CARD',
  PASSPORT = 'PASSPORT',
  DRIVER_LICENSE = 'DRIVER_LICENSE',
}

type IdentificationOption = {
  value: Identifications;
  label: string;
};

export const identificationOptions: IdentificationOption[] = [
  { value: Identifications.NATIONAL_IDENTITY_CARD, label: 'INE' },
  { value: Identifications.PASSPORT, label: i18n.t('form.identification.passport') },
  { value: Identifications.DRIVER_LICENSE, label: i18n.t('form.identification.driverLicense') },
];
