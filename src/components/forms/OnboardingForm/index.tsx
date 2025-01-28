import { PropsWithChildren } from 'react';
import BandoButton from '@components/Button';
import BoxContainer from '@components/BoxContainer';
import { Typography } from '@mui/material';
import Title from '@components/PageTitle';
import KillBLogo from '../../../assets/killb-logo.svg'

type OnboardingFormProps = PropsWithChildren & {
  complianceUrl: string;
};

const OnboardingForm = ({ complianceUrl }: OnboardingFormProps) => {
  return (
    <BoxContainer sx={{ maxWidth: { md: '60vw' }, width: { md: '30vw' }, m: '0 auto' }}>
      <Title variant="h4" sx={{ textAlign: 'center' }}>Onboarding Form</Title>
      <Typography variant="body1" sx={{ textAlign: 'center' }}>
        Please click the button below to start the onboarding process.
      </Typography>
      <BandoButton
        variant="contained"
        onClick={() => window.open(complianceUrl, 'popup', 'width=600,height=800')}
      >
        Start Onboarding
      </BandoButton>
      <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
        Powered by
        <img
          src={KillBLogo}
          alt="KillB Logo"
          style={{ display: 'inline', marginLeft: '5px', verticalAlign: 'middle' }}
        />
      </Typography>
    </BoxContainer>
  );
};

export default OnboardingForm;
