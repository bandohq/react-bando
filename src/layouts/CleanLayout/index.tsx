import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { PropsWithChildren } from 'react';
import Navbar from '@components/Navbar';
import SimpleFooter from '@components/SimpleFooter';
import theme from '@config/theme';
const TOP_PADDING = '78px';

const LayoutContainer = styled('div')(() => ({
  width: '100%',
  height: 'auto',
  minHeight: '100vh',
  background: "url('/images/Background.png')",
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'fixed',
  backgroundSize: 'cover',
}));

const Container = styled('div')(() => ({
  width: '100%',
  margin: '0 auto',
  height: 'auto',
  display: 'flex',
  padding: theme.spacing(2),
  paddingTop: TOP_PADDING,
}));

const ContentContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: '1280px',
  margin: '0 auto',
  padding: 0,
}));

export type CleanLayoutProps = PropsWithChildren;

export default function CleanLayout({ children }: CleanLayoutProps) {
  return (
    <LayoutContainer>
      <Navbar fullWidth />
      <Container>
        <ContentContainer>{children}</ContentContainer>
      </Container>
      <SimpleFooter bgColor="transparent" textColor="primary.main" />
    </LayoutContainer>
  );
}
