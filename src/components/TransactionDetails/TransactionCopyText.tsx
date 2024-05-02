import { CopyToClipboard } from 'react-copy-to-clipboard';
import { CircularButton } from '@components/forms/RampForm/RampTitle';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import CopyImg from '../../assets/CopyToClipboard.svg';
import { styled } from '@mui/material/styles';
import { ComponentProps, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const DetailText = styled(Typography)(({ theme }) => {
  return {
    fontFamily: 'TWK Everett',
    fontSize: theme.typography.pxToRem(14),
    color: theme.palette.ink.i700,
    textAlign: 'left',
    width: 'fit-content',
    lineHeight: 'normal',
    display: 'flex',
    alignItems: 'center',
    '&.ellipse': {
      display: 'inline-block',
      paddingTop: theme.spacing(0.7),
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
    },
  };
});

type TransactionCopyTextProps = ComponentProps<typeof DetailText> & {
  text: string;
  ellipse?: boolean;
};

export default function TransactionCopyText({
  text = '',
  ellipse = false,
  ...props
}: TransactionCopyTextProps) {
  const { t } = useTranslation('transactions');
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const handleCopy = () => {
    setTooltipOpen(true);
    setTimeout(() => {
      setTooltipOpen(false);
    }, 700);
  };
  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <DetailText {...props} className={`${ellipse ? 'ellipse' : ''}`}>
        {text}
      </DetailText>
      <Tooltip
        title={t('table.copied')}
        open={tooltipOpen}
        disableFocusListener
        disableHoverListener
        placement="top"
        arrow
      >
        <CopyToClipboard text={text} onCopy={() => handleCopy()}>
          <CircularButton sx={{ ml: 'auto' }}>
            <img src={CopyImg} alt="" width={16} height={16} />
          </CircularButton>
        </CopyToClipboard>
      </Tooltip>
    </Box>
  );
}
