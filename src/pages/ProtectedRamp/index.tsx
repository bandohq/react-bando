import ColumnLayout from '@layouts/ColumnLayout';
import RampForm from '@components/forms/RampForm';

export default function ProtectedRamp() {
  return <ColumnLayout leftContent={<RampForm noContainer />} alignTop />;
}
