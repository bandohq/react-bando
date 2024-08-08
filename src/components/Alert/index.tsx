import Alert, { AlertProps } from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { styled } from '@mui/material/styles';

export type BandoAlertProps = AlertProps & {
  title?: string;
  text: string;
};

const StyledAlert = styled(Alert)<AlertProps>({
  margin: '0 8px',
});

export default function BandoAlert({ title, text, severity, variant, icon }: BandoAlertProps) {
  return (
    <StyledAlert severity={severity} variant={variant} icon={icon || undefined}>
      {title && <AlertTitle>{title}</AlertTitle>}
      {text}
    </StyledAlert>
  );
}
