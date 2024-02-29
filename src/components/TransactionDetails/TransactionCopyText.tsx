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
  lineHeight: 'normal',
  display: 'flex',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    '& .addressText': {
      maxWidth: '200px',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    },
  },
  [theme.breakpoints.down('xs')]: {
    '& .addressText': {
      maxWidth: '100px',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    },
  },
}));

type TransactionCopyTextProps = ComponentProps<typeof DetailText> & {
  text: string;
};

export default function TransactionCopyText({ text = '', ...props }: TransactionCopyTextProps) {
  return (
    <DetailText {...props}>
      <span className="addressText">{text}</span>
      <CopyToClipboard text={text}>
        <CircularButton sx={{ ml: 1 }}>
          <img src={CopyImg} alt="" width={16} height={16} />
        </CircularButton>
      </CopyToClipboard>
    </DetailText>
  );
}
