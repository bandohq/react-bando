import ColumnLayout from '@layouts/ColumnLayout';
import KycBulletPoints from '@components/KycBulletPoints';
import TransactionDetailComponent from '@components/TransactionDetails';
import useTransaction from '@hooks/useTransaction';
import { useParams } from 'react-router-dom';
import { Transaction } from '@hooks/useTransaction/requests';

export default function ProtectedTransactionDetail() {
  const { txnId: transactionId } = useParams();
  const { transaction } = useTransaction({ transactionId });

  return (
    <ColumnLayout
      leftContent={
        <TransactionDetailComponent
          sx={{ margin: '0 auto' }}
          transaction={transaction as unknown as Transaction}
          noArrow
          success
        />
      }
      rightContent={<KycBulletPoints />}
      alignTop
    />
  );
}
