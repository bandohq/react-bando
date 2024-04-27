import Paper from '@mui/material/Paper';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { CircularButton } from '@components/forms/RampForm/RampTitle';

import Slide from '@mui/material/Slide';
import { styled } from '@mui/material/styles';
import { PropsWithChildren, ReactNode } from 'react';

const DialogDrawerComp = styled(Paper)(({ theme }) => ({
  position: 'absolute',
  width: '100%',
  maxWidth: '100%',
  height: '100%',
  backgroundColor: theme.palette.background.paper,
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1001,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
}));

const DrawerTitleCont = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  flexDirection: 'column',
  width: '100%',
  maxWidth: '100%',
  color: theme.palette.ink.i950,
  fontFamily: 'TWK Everett',
  fontSize: theme.typography.pxToRem(14),
  position: 'sticky',
  top: 0,
  backgroundColor: theme.palette.background.paper,
  zIndex: 1002,
  padding: theme.spacing(2),
  '& section': {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    '& svg': {
      width: 24,
    },
  },
}));

const DrawerTitle = styled('span')(({ theme }) => ({
  grow: 1,
  width: '100%',
  textAlign: 'center',
  fontSize: theme.typography.pxToRem(16),
}));

const DrawerCont = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
  width: '100%',
  overflowX: 'hidden',
  overflowY: 'auto',
}));

export type DialogDrawerProps = PropsWithChildren & {
  title?: string;
  titleContent?: ReactNode;
  open?: boolean;
  onClose?: () => void;
  showBackIcon?: boolean;
};

export default function DialogDrawer({
  children,
  titleContent,
  title = 'Escoge tu red y token',
  open = false,
  showBackIcon = true,
  onClose = () => {},
}: DialogDrawerProps) {
  return (
    <Slide direction="up" in={open} mountOnEnter unmountOnExit>
      <DialogDrawerComp>
        <DrawerTitleCont>
          <section>
            <CircularButton onClick={onClose} sx={{ color: 'ink.i950' }}>
              <ArrowBack />
            </CircularButton>
            <DrawerTitle sx={{ ...(showBackIcon && { marginLeft: '-40px' }) }}>{title}</DrawerTitle>
          </section>
          {titleContent}
        </DrawerTitleCont>
        <DrawerCont>{children}</DrawerCont>
      </DialogDrawerComp>
    </Slide>
  );
}
