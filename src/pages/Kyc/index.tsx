import ColumnLayout from '@layouts/ColumnLayout';
import KycForm from '@components/forms/KycForm';
import KycBulletPoints from '@components/KycBulletPoints';

export default function Kyc() {
  return <ColumnLayout leftContent={<KycForm />} rightContent={<KycBulletPoints />} alignTop />;
}
