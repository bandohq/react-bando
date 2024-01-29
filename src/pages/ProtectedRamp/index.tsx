import ColumnLayout from '@layouts/ColumnLayout';
import RampForm from '@components/forms/RampForm';
import KycBulletPoints from '@components/KycBulletPoints';

export default function ProtectedRamp() {
  return (
    <ColumnLayout
      leftContent={<RampForm noContainer />}
      rightContent={<KycBulletPoints />}
      alignTop
    />
  );
}
