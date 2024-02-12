import { CopyToClipboard } from 'react-copy-to-clipboard';
import { CircularButton } from '@components/forms/RampForm/RampTitle';
import Typography from '@mui/material/Typography';

import CopyImg from '../../assets/CopyToClipboard.svg';
import { styled } from '@mui/material/styles';
import { ComponentProps } from 'react';

export const DetailText = styled(Typography)(({ theme }) => ({
  fontFamily: 'TWK Everett',
  fontSize: theme.typography.pxToRem(14),
  color: theme.palette.ink.i700,
  textAlign: 'left',
  width: 'fit-content',
  lineHeight: 'normal',
  display: 'flex',
  alignItems: 'center',
}));

type TransactionCopyTextProps = ComponentProps<typeof DetailText> & {
  text: string;
};

export default function TransactionCopyText({ text = '', ...props }: TransactionCopyTextProps) {
  return (
    <DetailText {...props}>
      {text}
      <CopyToClipboard text={text}>
        <CircularButton sx={{ ml: 1 }}>
          <img src={CopyImg} alt="" width={16} height={16} />
        </CircularButton>
      </CopyToClipboard>
    </DetailText>
  );
}
