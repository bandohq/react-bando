import { TFunction } from 'i18next';

export enum Identifications {
  NATIONAL_IDENTITY_CARD = 'NATIONAL_IDENTITY_CARD',
  IFE = 'IFE',
  PASSPORT = 'PASSPORT',
  DRIVER_LICENSE = 'DRIVER_LICENSE',
}

export const identificationOptions = (t: TFunction<'form', undefined>) => [
  { value: Identifications.NATIONAL_IDENTITY_CARD, label: 'INE' },
  { value: Identifications.IFE, label: 'IFE' },
  { value: Identifications.PASSPORT, label: t('identification.passport') },
  { value: Identifications.DRIVER_LICENSE, label: t('identification.driverLicense') },
];
