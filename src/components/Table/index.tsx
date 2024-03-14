import { Fragment, useState } from 'react';
import { alpha, styled } from '@mui/material/styles';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { format } from 'date-fns';

import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import Box from '@mui/material/Box';
import CellDetailWithIcon from '@components/Table/CellDetailWithIcon';

import ArrowCircleIconBase from '@components/Svgs/ArrowCircle';
import StatusBadge from '@components/StatusBadge';
import mapProviderStatus from '@components/TransactionDetails/mapProviderStatus';
import { OperationType } from '@hooks/useTransaction/requests';

import formatNumber from '@helpers/formatNumber';

import Usdc from '../../assets/image-58_1.png';
import Mexico from '../../assets/Mexico-01.svg';
import Polygon from '../../assets/polygon.png';
import ArrowDown from '../../assets/ArrowDown.svg';
import CopyImg from '../../assets/CopyToClipboard.svg';
import theme from '@config/theme';
import {
  TableBody,
  StyledTableCell,
  StyledTableRow,
  RowTextDetail,
  TableRowDetail,
  HeaderCell,
} from './TableComponets';

const ArrowCircleIcon = styled(ArrowCircleIconBase)(() => ({
  width: 36,
  height: 36,
  marginRight: theme.spacing(0.5),
}));

const DepositArrow = styled(ArrowCircleIcon)(({ theme }) => ({
  transform: 'rotate(-90deg)',
  color: theme.palette.success.light,
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
  position: 'relative',
  '& img': {
    width: 'auto',
    height: '100%',
    objectFit: 'cover',
  },
  '&:after': {
    position: 'absolute',
    content: '""',
    backgroundColor: alpha(theme.palette.primary.contrastText, 0.15),
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
  },
  '&.selected': {
    '&:after': {
      backgroundColor: 'transparent',
    },
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
        : `${data.sent} ${data.sentCurrency}`,
    received:
      operationType === 'withdraw'
        ? `$ ${formatNumber(data.received)} ${data.receivedCurrency}`
        : `${data.received} ${data.receivedCurrency}`,
    sentIcon: operationType === 'withdraw' ? Usdc : Mexico,
    receivedIcon: operationType === 'withdraw' ? Mexico : Usdc,
    updatedAt: '2024-03-10 17:40:40.231',
    operationIcon: operationType === 'withdraw' ? <ArrowCircleIcon /> : <DepositArrow />,
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
          <StyledTableRow>
            <HeaderCell colSpan={5}>March 4, 2024</HeaderCell>
          </StyledTableRow>
          {rows.map((row, idx) => {
            const providerStatus = mapProviderStatus(row.status ?? '');
            const isRowSelected = idx === selectedRow;

            return (
              <Fragment key={`tableRow-${row.id}`}>
                <StyledTableRow
                  className={`top-row ${idx === selectedRow - 1 ? 'no-border' : ''}`}
                  onClick={() => onRowClick(idx)}
                  aria-checked={isRowSelected}
                  selected={isRowSelected}
                >
                  <StyledTableCell scope="row">
                    <TableRowDetail>
                      <CellDetailWithIcon
                        sx={{ width: 120 }}
                        mainIcon={row.operationIcon}
                        subIcon={row.networkIcon}
                        headerText={row.operationType}
                        subText={format(new Date(row.updatedAt), 'KK:m aaa')}
                        network={'network'}
                      />
                    </TableRowDetail>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <TableRowDetail>
                      <CellDetailWithIcon
                        sx={{ color: 'success.light' }}
                        headerText={row.sent}
                        mainIconComp={
                          <CurrencyContainerIcon className={isRowSelected ? 'selected' : ''}>
                            <img alt={row.sentCurrency} src={row.sentIcon} />
                          </CurrencyContainerIcon>
                        }
                      />
                    </TableRowDetail>
                  </StyledTableCell>

                  <StyledTableCell sx={{ maxWidth: 56 }}>
                    <ArrowIcon src={ArrowDown} />
                  </StyledTableCell>

                  <StyledTableCell>
                    <TableRowDetail>
                      <CellDetailWithIcon
                        sx={{ color: 'ink.i400' }}
                        headerText={row.received}
                        mainIconComp={
                          <CurrencyContainerIcon className={isRowSelected ? 'selected' : ''}>
                            <img alt={row.receivedCurrency} src={row.receivedIcon} />
                          </CurrencyContainerIcon>
                        }
                      />
                    </TableRowDetail>
                  </StyledTableCell>

                  <StyledTableCell>
                    <StatusBadge
                      {...providerStatus}
                      sx={{ fontSize: 14 }}
                      className="simple"
                      variant={isRowSelected ? 'default' : 'light'}
                      hideShadow
                    />
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow
                  key={`tableRow-detail-${row.id}`}
                  onClick={() => onRowClick(idx)}
                  aria-checked={isRowSelected}
                  selected={isRowSelected}
                  className={isRowSelected ? 'bottom-row selected' : 'bottom-row'}
                >
                  <StyledTableCell colSpan={7} sx={{ paddingTop: 1 }}>
                    <Box
                      sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 3,
                      }}
                    >
                      <>
                        <RowTextDetail>
                          <span>Fee</span>N/A
                        </RowTextDetail>
                        <RowTextDetail>
                          <span>Rate</span>$ 0.16 MXN
                        </RowTextDetail>
                        <RowTextDetail onClick={(e) => e.stopPropagation()}>
                          <span>Cuenta Destino</span>
                          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                            0x3a05...9115
                            <CopyToClipboard text={'hash'}>
                              <img src={CopyImg} alt="" width={16} height={16} />
                            </CopyToClipboard>
                          </Box>
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
