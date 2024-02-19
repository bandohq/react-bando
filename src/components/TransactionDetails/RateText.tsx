import { OperationType, Transaction } from '@hooks/useTransaction/requests';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import formatNumber from '@helpers/formatNumber';

type RateTextProps = {
  operationType?: OperationType;
  transaction?: Transaction;
  rate: number;
};

export const Amount = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.pxToRem(14),
  fontWeight: 'normal',
  lineHeight: 'normal',
  color: theme.palette.ink.i500,
  textAlign: 'left',
  margin: '0 6px',
}));

export default function RateText({ operationType, transaction, rate = 0 }: RateTextProps) {
  if (operationType === 'deposit') {
    return (
      <>
        1 {transaction?.quoteCurrency} ≈ <Amount variant="body2">${formatNumber(rate)}</Amount>{' '}
        {transaction?.baseCurrency}
      </>
    );
  }
  return (
    <>
      1 {transaction?.baseCurrency} ≈ <Amount variant="body2">${formatNumber(rate)}</Amount>{' '}
      {transaction?.quoteCurrency}
    </>
  );
}
