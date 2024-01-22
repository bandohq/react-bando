import ColumnLayout from '@layouts/ColumnLayout';
import KycForm from '@components/forms/KycForm';

export default function Kyc() {
  return <ColumnLayout leftContent={<KycForm />} alignTop />;
}
