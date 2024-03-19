import CleanLayout from '@layouts/CleanLayout';
import BoxContainer from '@components/BoxContainer';
import Typography from '@mui/material/Typography';

import CustomizedTables from '@components/Table';

export default function TransactionHistory() {
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
          Transaction History
        </Typography>

        <CustomizedTables />
      </BoxContainer>
    </CleanLayout>
  );
}
