import { FormEvent } from 'react';

export function checkNumberLength(e: FormEvent<HTMLInputElement>, maxLength: number) {
  if (e.currentTarget.value.length <= maxLength) return;
  e.currentTarget.value = e.currentTarget.value.slice(0, maxLength);
}

export function clearOnCaptureMaskedValue(e: FormEvent<HTMLInputElement>) {
  if (!e.currentTarget.value.includes('*')) return;
  e.currentTarget.value = '';
}

export function toUpperCase(e: FormEvent<HTMLInputElement>) {
  e.currentTarget.value = e.currentTarget.value.toUpperCase();
}

export function allowOnlyNumbers(e: FormEvent<HTMLInputElement>) {
  e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '');
}

export function removeZero(e: FormEvent<HTMLInputElement>) {
  if (e.currentTarget.value === '0') {
    e.currentTarget.value = '';
  }
}

export function addZero(e: FormEvent<HTMLInputElement>) {
  if (e.currentTarget.value === '') {
    e.currentTarget.value = '0';
  }
}

export function numberInputOnWheelPreventChange(e: React.WheelEvent<HTMLInputElement>) {
  // Prevent the input value change
  e.currentTarget.blur();
}
