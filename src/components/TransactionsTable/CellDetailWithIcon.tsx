import { ReactNode } from 'react';
import { TableRowDetail, TableRowDetail as Container } from './TableComponents';
import { SxProps, styled } from '@mui/material/styles';

type CellDetailWithIconProps = {
  mainIcon?: ReactNode;
  mainIconComp?: ReactNode;
  subIcon?: ReactNode;
  headerText: string;
  subText?: string;
  network?: string;
  sx?: SxProps;
};

export const TransactionTypeIcon = styled(TableRowDetail)(() => ({
  position: 'relative',
  '& span.network-img': {
    fontSize: 'inherit',
    position: 'absolute',
    width: 14,
    height: 14,
    display: 'flex',
    alignItems: 'center',
    bottom: '-3px',
    right: '-1px',
    borderRadius: '4px',
    overflow: 'hidden',
    padding: 0,
    '& img': {
      width: 'auto',
      height: '100%',
      objectFit: 'cover',
    },
  },
}));

export default function CellDetailWithIcon({
  mainIcon,
  mainIconComp,
  headerText,
  subText,
  network,
  subIcon,
  sx,
}: CellDetailWithIconProps) {
  const subIconComp = typeof subIcon === 'string' ? <img alt={network} src={subIcon} /> : subIcon;

  return (
    <Container sx={{ gap: 1, ...sx }}>
      {mainIcon ? (
        <TransactionTypeIcon>
          {mainIcon}
          {subIcon && <span className="network-img">{subIconComp}</span>}
        </TransactionTypeIcon>
      ) : (
        mainIconComp
      )}
      <Container
        sx={{
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContetn: 'flex-start',
          color: 'inherit',
        }}
      >
        <div>{headerText}</div>
        {subText && <span className="sub">{subText}</span>}
      </Container>
    </Container>
  );
}
