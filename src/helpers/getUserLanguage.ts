import { es, enUS } from 'date-fns/locale';
import { setDefaultOptions } from 'date-fns';

export default function getUserLanguage() {
  // TODO: Uncomment when adding different languages
  // return navigator.language;
  return 'es';
}

export function getDateLocale(locale: string) {
  if (locale === 'es') return es;
  return enUS;
}

export const userLocale = getDateLocale(getUserLanguage());

export const setupDateLocale = () => {
  setDefaultOptions({ locale: userLocale });
};
