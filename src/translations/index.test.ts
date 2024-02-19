import { useTranslation } from 'react-i18next';
import i18n from '.';

describe('i18n', () => {
  it('Is i18n instance', () => {
    expect(i18n).toBeObject();
  });
});

describe('useTranslation tests implementation', () => {
  it('Should return an string with the same keys', () => {
    const { t } = useTranslation();

    expect(t('placeholder.example')).toBe('placeholder.example');
  });
});
