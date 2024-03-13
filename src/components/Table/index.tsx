import Table from '@mui/material/Table';
import TableBodyBase from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import ArrowCircleIcon from '@components/Svgs/ArrowCircle';
import { format } from 'date-fns';

import formatNumber from '@helpers/formatNumber';

import Usdc from '../../assets/image-58_1.png';
import Mexico from '../../assets/Mexico-01.svg';
import Polygon from '../../assets/polygon.png';
import ArrowDown from '../../assets/ArrowDown.svg';

import { Fragment, useState } from 'react';
import { styled } from '@mui/material/styles';
import { OperationType } from '@hooks/useTransaction/requests';
import mapProviderStatus from '@components/TransactionDetails/mapProviderStatus';
import StatusBadge from '@components/StatusBadge';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  verticalAlign: 'middle',
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
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  padding: theme.spacing(2, 1),
  '& td, & th, & td:first-of-type': {
    border: 'none',
    borderColor: '#E0E0E0',
    borderBottom: '1px solid #E0E0E0',
  },

  '&:nth-of-type(odd)': {},
  '&:first-of-type td, &:first-of-type th': {},
  '&:last-child td, &:last-child th': {},
  '&:hover': {
    cursor: 'pointer',
  },

  '&.top-row td, &.bottom-row td': {
    transition: 'all 270ms ease-in',
  },

  '&.bottom-row': {
    opacity: 0,
    display: 'none',
    visibility: 'hidden',
    animation: 'outAnimation 270ms ease-out',
    animationFillMode: 'forwards',
    '& td': {
      borderBottom: '1px solid transparent',
    },
  },

  '&.top-row td': {
    borderTop: '1px solid transparent',
  },

  '&.top-row td:first-of-type': {
    borderTopLeftRadius: '8px',
    borderTop: '1px solid transparent',
    borderLeft: '1px solid transparent',
  },
  '&.top-row td:last-child': {
    borderTopRightRadius: '8px',
    borderTop: '1px solid transparent',
    borderRight: '1px solid transparent',
  },
  '&.bottom-row td:first-of-type': {
    borderBottomLeftRadius: '8px',
    borderLeft: '1px solid transparent',
  },
  '&.bottom-row td:last-child': {
    borderBottomRightRadius: '8px',
    borderRight: '1px solid transparent',
  },

  '&.Mui-selected': {
    backgroundColor: '#fff',

    '&.bottom-row': {
      opacity: 1,
      visibility: 'visible',
      display: 'table-row',
      animation: 'inAnimation 250ms ease-out',
    },

    '&.top-row td': {
      borderBottom: 'none',
      borderRight: 'none',
      borderLeft: 'none',
      borderColor: 'transparent',
      borderTop: `1px solid ${theme.palette.info.main}`,
    },
    '&.top-row td:first-of-type': {
      borderRight: 'none',
      borderBottom: 'none',
      borderColor: 'transparent',
      borderTop: `1px solid ${theme.palette.info.main}`,
      borderLeft: `1px solid ${theme.palette.info.main}`,
      borderTopLeftRadius: '8px',
    },

    '&.top-row td:last-child': {
      borderRight: `1px solid ${theme.palette.info.main}`,
      borderTopRightRadius: '8px',
    },

    '&.bottom-row td': {
      borderTop: 'none',
      borderColor: 'transparent',
      borderBottom: `1px solid ${theme.palette.info.main}`,
    },
    '&.bottom-row td:first-of-type': {
      borderRight: 'none',
      borderTop: 'none',
      borderColor: 'transparent',
      borderLeft: `1px solid ${theme.palette.info.main}`,
      borderBottom: `1px solid ${theme.palette.info.main}`,
      borderBottomLeftRadius: '8px',
    },
    '&.bottom-row td:last-child': {
      borderRight: `1px solid ${theme.palette.info.main}`,
      borderBottomRightRadius: '8px',
    },

    '&:hover': {
      cursor: 'pointer',
      backgroundColor: 'inherit',
    },
  },
}));

const RowTextDetail = styled(Box)(({ theme }) => ({
  fontSize: 14,
  color: theme.palette.ink.i800,
  display: 'flex',
  flexDirection: 'column',
  '& span': {
    color: theme.palette.ink.i400,
    fontSize: 12,
  },
}));

const TableRowDetail = styled(RowTextDetail)(() => ({
  flexDirection: 'row',
  alignItems: 'center',
  textTransform: 'capitalize',
}));

const DepositArrow = styled(ArrowCircleIcon)(({ theme }) => ({
  transform: 'rotate(-90deg)',
  color: theme.palette.success.light,
  width: 32,
  height: 32,
  '& rect': {
    color: theme.palette.success.light,
    stroke: theme.palette.success.light,
  },
  '& path, & d': {
    color: theme.palette.success.light,
    fill: theme.palette.success.light,
  },
}));

const CurrencyContainerIcon = styled('span')(() => ({
  width: 32,
  height: 32,
  aspectRatio: '1/1',
  borderRadius: '50%',
  overflow: 'hidden',
  '& img': {
    width: 'auto',
    height: '100%',
    objectFit: 'cover',
  },
}));

const ArrowIcon = styled('img')(() => ({
  width: 22,
  height: 22,
  aspectRatio: '1/1',
  transform: 'rotate(-90deg)',
}));

function createData({
  operationType,
  ...data
}: {
  operationType: OperationType;
  sent: number;
  sentCurrency: string;
  received: number;
  receivedCurrency: string;
  status: string;
  id: number;
  from: string;
}) {
  return {
    operationType,
    ...data,
    networkIcon: Polygon,
    sent:
      operationType === 'deposit'
        ? `$ ${formatNumber(data.sent)}`
        : `+ ${data.sent} ${data.sentCurrency}`,
    received:
      operationType === 'withdraw'
        ? `$ ${formatNumber(data.received)}`
        : `+ ${data.received} ${data.receivedCurrency}`,
    sentIcon: operationType === 'withdraw' ? Usdc : Mexico,
    receivedIcon: operationType === 'withdraw' ? Mexico : Usdc,
    updatedAt: '2024-03-10 17:40:40.231',
    operationIcon:
      operationType === 'withdraw' ? (
        <ArrowCircleIcon sx={{ width: 32, height: 32 }} />
      ) : (
        <DepositArrow />
      ),
  };
}

const rows = [
  createData({
    operationType: 'withdraw',
    sent: 0.03,
    sentCurrency: 'USDC',
    received: 109.16,
    receivedCurrency: 'MXN',
    status: 'CASH_IN_PROCESSING',
    id: 11,
    from: '0x3a05...9115',
  }),
  createData({
    operationType: 'deposit',
    sent: 109.16,
    sentCurrency: 'MXN',
    received: 0.03,
    receivedCurrency: 'USDC',
    status: 'CONVERSION_COMPLETED',
    id: 22,
    from: '0x3a05...9115',
  }),
  createData({
    operationType: 'withdraw',
    sent: 0.03,
    sentCurrency: 'USDC',
    received: 109.16,
    receivedCurrency: 'MXN',
    status: 'EXPIRED',
    id: 33,
    from: '0x3a05...9115',
  }),
  createData({
    operationType: 'deposit',
    sent: 109.16,
    sentCurrency: 'MXN',
    received: 0.03,
    receivedCurrency: 'USDC',
    status: 'COMPLETED',
    id: 44,
    from: '0x3a05...9115',
  }),
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
        <TableBody>
          {rows.map((row, idx) => {
            const providerStatus = mapProviderStatus(row.status ?? '');

            return (
              <Fragment key={`tableRow-${row.id}`}>
                <StyledTableRow
                  className="top-row"
                  onClick={() => onRowClick(idx)}
                  aria-checked={idx === selectedRow}
                  selected={idx === selectedRow}
                >
                  <StyledTableCell scope="row">
                    <TableRowDetail sx={{ gap: 1, width: 120 }}>
                      {row.operationIcon}
                      <TableRowDetail sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                        <div>{row.operationType}</div>
                        <Box sx={{ textTransform: 'none', color: 'ink.i400' }}>
                          {format(new Date(row.updatedAt), 'KK:m aaa')}
                        </Box>
                      </TableRowDetail>
                    </TableRowDetail>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <TableRowDetail sx={{ gap: 1, color: 'success.light' }}>
                      <CurrencyContainerIcon>
                        <img alt={row.sentCurrency} src={row.sentIcon} />
                      </CurrencyContainerIcon>
                      {row.sent}
                    </TableRowDetail>
                  </StyledTableCell>
                  <StyledTableCell sx={{ maxWidth: 56 }}>
                    <ArrowIcon src={ArrowDown} />
                  </StyledTableCell>

                  <StyledTableCell>
                    <TableRowDetail sx={{ gap: 1, color: 'ink.i400' }}>
                      <CurrencyContainerIcon>
                        <img alt={row.receivedCurrency} src={row.receivedIcon} />
                      </CurrencyContainerIcon>
                      {row.received}
                    </TableRowDetail>
                  </StyledTableCell>

                  <StyledTableCell>
                    <StatusBadge {...providerStatus} sx={{ fontSize: 14 }} className="simple" />
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow
                  key={`tableRow-detail-${row.id}`}
                  onClick={() => onRowClick(idx)}
                  aria-checked={idx === selectedRow}
                  selected={idx === selectedRow}
                  className={idx === selectedRow ? 'bottom-row selected' : 'bottom-row'}
                >
                  <StyledTableCell colSpan={7} sx={{ paddingTop: 0 }}>
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
                          0x3a05...9115
                        </RowTextDetail>
                      </>
                    </Box>
                  </StyledTableCell>
                </StyledTableRow>
              </Fragment>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
