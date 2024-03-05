import { Typography, Container } from '@mui/material';
import { useTranslation } from 'react-i18next';

type SimpleFooterProps = {
  bgColor?: string;
  textColor?: string;
};

export default function SimpleFooter({ bgColor, textColor }: SimpleFooterProps) {
  const { t } = useTranslation('footer');

  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: '1200px',
        minHeight: '150px',
        paddingTop: '30px',
        backgroundColor: bgColor || 'primary.main',
      }}
    >
      <Typography variant="body2" sx={{ color: textColor, pt: 6 }} align="center">
        {t('disclaimer')}
      </Typography>
    </Container>
  );
}
