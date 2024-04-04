import { Fragment, useState } from 'react';
import { format } from 'date-fns';

import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TransactionRow from './TransactionRow';
import { TableBody, StyledTableRow, HeaderCell } from './TableComponents';

import useTransactions from '@hooks/useTransactions';

export default function TransactionsTable() {
  const [selectedRow, setSelectedRow] = useState('');
  const { transactions } = useTransactions();

  const onRowClick = (rowId: string) => {
    setSelectedRow((currentRow) => (rowId === currentRow ? '' : rowId));
  };

  return (
    <TableContainer>
      <Table
        sx={{ minWidth: 700, borderCollapse: 'separate', borderSpacing: 0 }}
        aria-label="customized table"
      >
        <TableBody>
          {!!transactions &&
            Object.keys(transactions).map((key) => {
              const txns = transactions[key];

              return (
                <Fragment key={`tableRow-header-${key}`}>
                  <StyledTableRow>
                    <HeaderCell colSpan={5} sx={{ textTransform: 'capitalize' }}>
                      {format(new Date(key ?? ''), 'MMM d, y')}
                    </HeaderCell>
                  </StyledTableRow>
                  {txns.map((txn, idx) => (
                    <TransactionRow
                      key={`tableRow-${key}-${idx}`}
                      txn={txn}
                      rowId={`${key}-${idx}`}
                      selectedRow={selectedRow}
                      onRowClick={onRowClick}
                    />
                  ))}
                </Fragment>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
