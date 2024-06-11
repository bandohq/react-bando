import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { PropsWithChildren } from 'react';
import SimpleFooter from '@components/SimpleFooter';
import theme from '@config/theme';
import BLogo from '../../assets/logo.svg';
const TOP_PADDING = '38px';

const LayoutContainer = styled('div')(() => ({
  width: '100%',
  height: 'auto',
  minHeight: '100vh',
  background:
    'linear-gradient(45deg, rgba(247,251,252,1) 0%,rgba(220,244,235,0.8) 40%,rgba(64,180,148,0.5) 100%);',
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'fixed',
  backgroundSize: 'cover',
}));

const Container = styled('div')(() => ({
  width: '100%',
  margin: '0 auto',
  height: 'auto',
  minHeight: '10vh',
  display: 'flex',
  padding: theme.spacing(2),
  paddingTop: TOP_PADDING,
}));

const ContentContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
  padding: 0,
}));

const Logo = styled('img')(() => ({
  width: '120px',
  margin: '0 auto',
}));

export type EmptyLayoutProps = PropsWithChildren;

export default function EmptyLayout({ children }: EmptyLayoutProps) {
  return (
    <LayoutContainer>
      <ContentContainer sx={{ mt: '50px' }}>
        <Logo src={BLogo} />
      </ContentContainer>
      <Container>
        <ContentContainer>{children}</ContentContainer>
      </Container>
      <SimpleFooter bgColor="transparent" textColor="primary.main" />
    </LayoutContainer>
  );
}
