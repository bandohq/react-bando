import CleanLayout from '@layouts/CleanLayout';
import MarkDownContainer from '@components/MarkDownContainer';
import { useTranslation } from 'react-i18next';
export default function FAQ() {
  const { t } = useTranslation('faq');

  const markdown = `
  # ${t('title')}

  ### **${t('q1.title')}**

  ${t('q1.info')}

  ### **${t('q2.title')}**

  ${t('q2.info')}

  ### **${t('q3.title')}**

  ${t('q3.info')}

  ### **${t('q4.title')}**

   ${t('q4.info')}

  ### **${t('q5.title')}**

  ${t('q5.info')}

  ### **${t('q6.title')}**

  ${t('q6.info')}

  ${t('q6.info2')}

  ### **${t('q7.title')}**

  ${t('q7.info')}`;

  return (
    <CleanLayout>
      <MarkDownContainer
        sx={{ width: '100%', maxWidth: '800px', height: 'fit-content', margin: '0 auto' }}
        content={markdown}
      />
    </CleanLayout>
  );
}
