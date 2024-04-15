import LandingLayout from '@layouts/LandingLayout';
import GetQuoteForm from '@components/forms/GetQuoteForm';

export default function Landing() {
  return (
    <LandingLayout>
      <GetQuoteForm enableNewWidget />
    </LandingLayout>
  );
}
