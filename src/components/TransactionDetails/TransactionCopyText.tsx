import { CopyToClipboard } from 'react-copy-to-clipboard';
import { CircularButton } from '@components/forms/RampForm/RampTitle';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import CopyImg from '../../assets/CopyToClipboard.svg';
import { styled } from '@mui/material/styles';
import { ComponentProps } from 'react';

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
      // flexGrow: 1,
      // width: '100px',
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
  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <DetailText {...props} className={`${ellipse ? 'ellipse' : ''}`}>
        {text}
      </DetailText>
      <CopyToClipboard text={text}>
        <CircularButton sx={{ ml: 'auto' }}>
          <img src={CopyImg} alt="" width={16} height={16} />
        </CircularButton>
      </CopyToClipboard>
    </Box>
  );
}
