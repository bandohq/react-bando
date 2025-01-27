import { PropsWithChildren } from 'react';
import Button from '@components/Button';
import BoxContainer from '@components/BoxContainer';
import { Typography } from '@mui/material';

type OnboardingFormProps = PropsWithChildren & {
  complianceUrl: string;
};

const OnboardingForm = ({ complianceUrl }: OnboardingFormProps) => {
  return (
    <BoxContainer>
      <Typography variant="h4">Onboarding Form</Typography>
      <Typography variant="body1">
        Please click the button below to start the onboarding process.
      </Typography>
      <Button
        onClick={() => window.open(complianceUrl, 'popup', 'width=600,height=600')}
      >
        Start Onboarding
      </Button>
      <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
        Powered by
        <img src="/path/to/provider-logo.png" alt="Provider Logo" style={{ display: 'inline', marginLeft: '5px', verticalAlign: 'middle' }} />
      </Typography>
    </BoxContainer>
  )
}

export default OnboardingForm;
