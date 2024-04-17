import Alert, { AlertProps } from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { styled } from '@mui/material/styles';

export type BandoAlertProps = AlertProps & {
  title?: string;
  text: string;
};

const StyledAlert = styled(Alert)<AlertProps>({
  width: '100%',
  marginBottom: '10px',
});

export default function BandoAlert({ title, text, severity, variant }: BandoAlertProps) {
  return (
    <StyledAlert severity={severity} variant={variant}>
      {title && <AlertTitle>{title}</AlertTitle>}
      {text}
    </StyledAlert>
  );
}
