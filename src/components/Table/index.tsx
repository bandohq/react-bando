import Table from '@mui/material/Table';
import TableBodyBase from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';

import { useState } from 'react';
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const TableBody = styled(TableBodyBase)(() => ({
  overflow: 'hidden',
  transition: 'all 200ms',
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  padding: theme.spacing(2, 1),
  border: 0,
  '&:nth-of-type(odd)': {},
  '&:first-child td, &:first-child th': {},
  '&:last-child td, &:last-child th': {},
  '&:hover': {
    cursor: 'pointer',
  },

  '&.Mui-selected': {
    backgroundColor: '#fff',

    '&.top-row td': {
      borderTop: `1px solid ${theme.palette.primary.main}`,
      borderBottom: '0',
    },
    '&.top-row td:first-child': {
      border: `1px solid ${theme.palette.primary.main}`,
      borderRight: '0',
      borderBottom: '0',
      borderTopLeftRadius: '8px',
    },

    '&.top-row td:last-child': {
      borderRight: `1px solid ${theme.palette.primary.main}`,
      borderTopRightRadius: '8px',
    },

    '&.bottom-row td': {
      borderBottom: `1px solid ${theme.palette.primary.main}`,
      borderTop: '0',
    },
    '&.bottom-row td:first-child': {
      border: `1px solid ${theme.palette.primary.main}`,
      borderRight: '0',
      borderTop: '0',
      borderBottomLeftRadius: '8px',
    },

    '&.bottom-row td:last-child': {
      borderRight: `1px solid ${theme.palette.primary.main}`,
      borderBottomRightRadius: '8px',
    },
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: 'inherit',
    },
    '& .MuiTableCell-root': {
      borderBottom: 0,
    },
  },
}));

const RowTextDetail = styled(Box)(({ theme }) => ({
  fontSize: 16,
  color: theme.palette.ink.i800,
  display: 'flex',
  flexDirection: 'column',
  '& span': {
    color: theme.palette.ink.i500,
    fontSize: 12,
  },
}));

function createData(
  operationType: string,
  sent: number,
  sentCurrency: string,
  receive: number,
  receiveCurrency: string,
  status: string,
  id: number,
  from: string,
) {
  return { id, from, operationType, sent, sentCurrency, receive, receiveCurrency, status };
}

const rows = [
  createData('withdrawn', 0.03, 'ETH', 109.16, 'MXN', 'PENDING', 11, '0x3a05...9115'),
  createData('deposit', 109.16, 'MXN', 0.03, 'ETH', 'PENDING', 22, '0x3a05...9115'),
  createData('withdrawn', 0.03, 'ETH', 109.16, 'MXN', 'PENDING', 33, '0x3a05...9115'),
  createData('deposit', 109.16, 'MXN', 0.03, 'ETH', 'PENDING', 44, '0x3a05...9115'),
];

export default function CustomizedTables() {
  const [selectedRow, setSelectedRow] = useState(-1);

  const onRowClick = (rowId: number) => {
    setSelectedRow((currentRow) => (rowId === currentRow ? -1 : rowId));
  };

  return (
    <TableContainer>
      <Table
        sx={{ minWidth: 700, borderCollapse: 'separate', borderSpacing: 0 }}
        aria-label="customized table"
      >
        {rows.map((row, idx) => (
          <TableBody key={`tableRow-${row.id}`} className={idx === selectedRow ? 'selected' : ''}>
            <StyledTableRow
              className="top-row"
              onClick={() => onRowClick(idx)}
              aria-checked={idx === selectedRow}
              selected={idx === selectedRow}
            >
              <StyledTableCell scope="row">{row.operationType}</StyledTableCell>
              <StyledTableCell align="right">{row.sent}</StyledTableCell>
              <StyledTableCell align="right">{row.receive}</StyledTableCell>
              <StyledTableCell align="right">{row.status}</StyledTableCell>
              <StyledTableCell align="left" sx={{ maxWidth: 70 }}>
                <RowTextDetail>
                  <span>From</span>
                  {row.from}
                </RowTextDetail>
              </StyledTableCell>
            </StyledTableRow>
            {idx === selectedRow && (
              <StyledTableRow
                key={`tableRow-detail-${row.id}`}
                onClick={() => onRowClick(idx)}
                aria-checked={idx === selectedRow}
                selected={idx === selectedRow}
                className="bottom-row"
              >
                <StyledTableCell colSpan={6} sx={{ paddingTop: 0 }}>
                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'row',
                      gap: 1.5,
                    }}
                  >
                    <>
                      <RowTextDetail>
                        <span>Fee</span>
                        N/A
                      </RowTextDetail>
                      <RowTextDetail>
                        <span>Transaction hash</span>
                        0x21...123
                      </RowTextDetail>
                    </>
                  </Box>
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        ))}
      </Table>
    </TableContainer>
  );
}
