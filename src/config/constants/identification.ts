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
  { value: Identifications.PASSPORT, label: 'Pasaporte' },
  { value: Identifications.DRIVER_LICENSE, label: 'Licencia de conducir' },
];
