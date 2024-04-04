import CleanLayout from '@layouts/CleanLayout';
import BoxContainer from '@components/BoxContainer';
import Typography from '@mui/material/Typography';

import TransactionsTable from '@components/TransactionsTable';
import { useTranslation } from 'react-i18next';

export default function TransactionHistory() {
  const { t } = useTranslation('transactions');

  return (
    <CleanLayout>
      <BoxContainer
        sx={{
          margin: '0 auto',
          mt: 2,
          padding: 3,
          width: '100%',
          // minHeight: '100%',
          maxWidth: '860px',
        }}
      >
        <Typography
          variant="body1"
          sx={{
            fontSize: '27px !important',
            fontFamily: 'Kanit',
            fontWeight: '500',
            mb: 1,
          }}
        >
          {t('history')}
        </Typography>

        <TransactionsTable />
      </BoxContainer>
    </CleanLayout>
  );
}
