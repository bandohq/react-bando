import CleanLayout from '@layouts/CleanLayout';
import TransactionDetailComponent from '@components/TransactionDetails';

import useTransaction from '@hooks/useTransaction';
import { useParams } from 'react-router-dom';
import { Transaction } from '@hooks/useTransaction/requests';

export default function TransactionDetail() {
  const { txnId: transactionId } = useParams();
  const { transaction } = useTransaction({ transactionId });

  return (
    <CleanLayout>
      <TransactionDetailComponent
        sx={{ margin: '0 auto' }}
        transaction={transaction as unknown as Transaction}
        title="Resumen"
        showStatusBadge
        showFooter
        noArrow
        success
        networkObj={null}
        tokenObj={null}
      />
    </CleanLayout>
  );
}
