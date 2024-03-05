import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

import { styled } from '@mui/material/styles';
import SimpleFooter from '../SimpleFooter';

const Container = styled('div')(() => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  position: 'relative',
}));

const BulletContainer = styled('div')(({ theme }) => ({
  maxWidth: '480px',
  width: '100%',
  margin: 'auto',
  padding: theme.spacing(3, 0),
}));

const Title = styled(Typography)(({ theme }) => ({
  color: theme.palette.ink.i900,
  fontSize: `${theme.typography.pxToRem(22)} !important`,
  lineHeight: '1.3em',
  textAlign: 'center',
  fontFamily: 'Kanit',
  fontWeight: 'normal',
}));

const BulletList = styled('ul')(({ theme }) => ({
  fontFamily: 'TWK Everett',
  color: theme.palette.ink.i900,
  fontSize: `${theme.typography.pxToRem(14)} !important`,
  paddingTop: theme.spacing(2),
  '& li': {
    listStyleImage: 'url(/images/CheckGreen.svg)',
    padding: theme.spacing(1, 0),
    paddingLeft: theme.spacing(1),
  },
}));

export default function KycBulletPoints() {
  const { t } = useTranslation('kycPoints');
  const points = t('points', { returnObjects: true });

  return (
    <Container>
      <BulletContainer>
        <Title variant="h6">{t('title')} </Title>

        <BulletList>
          {points.map((point, idx) => (
            <li key={`kycPOint-${idx}`}>{point}</li>
          ))}
        </BulletList>
      </BulletContainer>
      <SimpleFooter bgColor="transparent" textColor="ink.i500" />
    </Container>
  );
}
