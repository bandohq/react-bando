import { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';

import Box from '@mui/material/Box';
import CellDetailWithIcon from '@components/TransactionsTable/CellDetailWithIcon';
import formatNumber from '@helpers/formatNumber';

import ArrowCircleIconBase from '@components/Svgs/ArrowCircle';
import Tooltip from '@mui/material/Tooltip';

import StatusBadge from '@components/StatusBadge';
import mapProviderStatus from '@components/TransactionDetails/mapProviderStatus';
import { currencyImgPathV2 as currencyImgPath } from '@config/constants/currencies';

import ArrowDown from '../../assets/ArrowDown.svg';
import CopyImg from '../../assets/CopyToClipboard.svg';
import { StyledTableCell, StyledTableRow, RowTextDetail, TableRowDetail } from './TableComponents';

import {
  DepositCashinDetailsArgs,
  OperationType,
  Transaction,
  WithDrawCashinDetailsArgs
} from '@hooks/useTransaction/requests';
import formatWalletNumber from '@helpers/formatWalletNumber';
import translations from "@translations/index.ts";

const ArrowCircleIcon = styled(ArrowCircleIconBase)(({ theme }) => ({
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

export const CurrencyContainerIcon = styled('span')(({ theme }) => ({
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

function formatAmounts(amount: number, currency: string) {
  return `$ ${formatNumber(amount, 2, 18)} ${currency}`;
}

function parseDataForRows(txn: Transaction) {
  const isDeposit = txn.operationType === 'deposit';

  return {
    ...txn,
    quoteCurrency: txn.quoteCurrency.toUpperCase(),
    address: txn?.recipient ?? '',
    networkIcon: txn?.networkConfig?.imageUrl,
    sent: formatAmounts(txn.baseAmount, txn.baseCurrency),
    received: formatAmounts(txn.quoteAmount, txn.quoteCurrency),
    payment_reference: txn.cashinDetails?.concepto,
    ...(isDeposit
      ? {
          sentIcon: currencyImgPath[txn.baseCurrency as unknown as keyof typeof currencyImgPath],
          receivedIcon: txn.asset?.imageUrl,
        }
      : {
          sentIcon: txn.asset?.imageUrl,
          receivedIcon:
            currencyImgPath[txn.quoteCurrency as unknown as keyof typeof currencyImgPath],
        }),
    operationIcon: !isDeposit ? <ArrowCircleIcon /> : <DepositArrow />,
  };
}
export type TransactionRowProps = {
  txn: Transaction;
  rowId: string;
  selectedRow: string;
  onRowClick: (rowId: string) => void;
};

function PaymentReference({cashinDetails}: Transaction) {
  const { t } = useTranslation('transactions');
  if (cashinDetails?.concepto) {
    return <RowTextDetail><span>{t('table.reference')}</span>{cashinDetails.concepto}</RowTextDetail>;
  }
  return (null);
}

export default function TransactionRow({
  txn,
  rowId,
  selectedRow,
  onRowClick,
}: TransactionRowProps) {
  const { t } = useTranslation('transactions');
  const [showTooltip, setShowTooltip] = useState(false);
  const providerStatus = mapProviderStatus(txn.providerStatus ?? '');
  const isRowSelected = rowId === selectedRow;
  const row = parseDataForRows(txn);

  const showTooltipOnCopy = () => {
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 700);
  };

  return (
    <>
      <StyledTableRow
        className={'top-row'}
        onClick={() => onRowClick(rowId)}
        aria-checked={isRowSelected}
        selected={isRowSelected}
      >
        <StyledTableCell scope="row">
          <TableRowDetail>
            <CellDetailWithIcon
              sx={{ width: 120 }}
              mainIcon={row.operationIcon}
              subIcon={row.networkIcon}
              headerText={t(`table.${txn.operationType as unknown as OperationType}`)}
              subText={format(new Date(row?.createdAt ?? ''), 'KK:mm aaa')}
              network={row?.networkConfig?.name ?? ''}
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
                  <img alt={row.baseCurrency} src={row.sentIcon} />
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
                  <img alt={row.quoteCurrency} src={row.receivedIcon} />
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
        onClick={() => onRowClick(rowId)}
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
                <span>{t('table.rate')}</span>
                {formatNumber(row.quoteRateInverse, 2, 18)} {row.quoteCurrency}
              </RowTextDetail>
              <RowTextDetail onClick={(e) => e.stopPropagation()}>
                <span>{t('table.address')}</span>

                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <>
                    <Tooltip title={row.address} placement="top" arrow>
                      <Box>
                        {row.address.length > 18 ? formatWalletNumber(row.address) : row.address}
                      </Box>
                    </Tooltip>
                    <Tooltip title={t('table.copied')} placement="top" arrow open={showTooltip}>
                      <Box>
                        <CopyToClipboard text={row.address} onCopy={() => showTooltipOnCopy()}>
                          <img src={CopyImg} alt="" width={16} height={16} />
                        </CopyToClipboard>
                      </Box>
                    </Tooltip>
                  </>
                </Box>
              </RowTextDetail>
              <PaymentReference cashinDetails={txn.cashinDetails}></PaymentReference>
            </>
          </Box>
        </StyledTableCell>
      </StyledTableRow>
    </>
  );
}
