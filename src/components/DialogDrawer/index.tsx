import Button from '@mui/material/Button';

import DialogBase from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { styled } from '@mui/material/styles';
import { Ref, forwardRef, ReactElement } from 'react';

const Transition = forwardRef(function Transition(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: TransitionProps & { children: ReactElement<any, any> },
  ref: Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Dialog = styled(DialogBase)({
  position: 'absolute',
  '& .MuiDialog-paper	': {
    border: '1px solid red',
    position: 'absolute',
  },
});

export type DialogDrawerProps = {
  open?: boolean;
  onClose?: () => void;
};

export default function DialogDrawer({ open = false, onClose = () => {} }: DialogDrawerProps) {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      sx={{ position: 'absolute', top: 0 }}
      slots={{ backdrop: () => null }}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Use Google's location service?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Let Google help apps determine location. This means sending anonymous location data to
          Google, even when no apps are running.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Disagree</Button>
        <Button onClick={onClose}>Agree</Button>
      </DialogActions>
    </Dialog>
  );
}
