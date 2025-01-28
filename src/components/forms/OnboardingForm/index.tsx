import { PropsWithChildren } from 'react';
import BandoButton from '@components/Button';
import BoxContainer from '@components/BoxContainer';
import { Typography } from '@mui/material';
import Title from '@components/PageTitle';
import KillBLogo from '../../../assets/killb-logo.svg';
import { useTranslation } from 'react-i18next';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';

type OnboardingFormProps = PropsWithChildren & {
  complianceUrl: string;
  onboardingStatus: string | undefined;
};

const OnboardingForm = ({ complianceUrl, onboardingStatus }: OnboardingFormProps) => {
  const { t } = useTranslation('form');
  return (
    <BoxContainer sx={{ maxWidth: { md: '60vw' }, width: { md: '30vw' }, m: '0 auto' }}>
      <Title variant="h4" sx={{ textAlign: 'center', mb: 0 }}>
        {t('onboarding.title')}
      </Title>
      <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
        {t('onboarding.status')}
        {onboardingStatus == 'ACTIVE' && (
          <CheckCircleIcon sx={{ color: 'success.main', verticalAlign: 'middle', ml: 1 }} />
        )}
        {onboardingStatus == 'REJECTED' && (
          <Typography component="span" variant="body2" sx={{ color: 'error.main' }}>
            {onboardingStatus}
          </Typography>
        )}
        {(onboardingStatus == 'PENDING' || onboardingStatus === undefined) && (
          <PendingIcon sx={{ color: 'warning.main', verticalAlign: 'middle', ml: 1 }} />
        )}
      </Typography>
      <BandoButton
        disabled={onboardingStatus === 'ACTIVE'}
        variant="contained"
        onClick={() => window.open(complianceUrl, 'popup', 'width=600,height=800')}
      >
        {t('onboarding.button')}
      </BandoButton>
      <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
        {t('onboarding.poweredBy')}
        <img
          src={KillBLogo}
          alt="KillB Logo"
          style={{
            display: 'inline',
            marginLeft: '5px',
            verticalAlign: 'middle',
            maxWidth: '40px',
          }}
        />
      </Typography>
    </BoxContainer>
  );
};

export default OnboardingForm;
