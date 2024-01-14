import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import { ReactNode } from 'react';
import Navbar from '@components/Navbar';

const TOP_PADDING = '78px';

const LayoutContainer = styled('div')(({ theme }) => ({
  width: '100%',
  height: 'auto',
  minHeight: '100vh',
  background: "url('/images/Background.png')",
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'fixed',
  backgroundSize: 'cover',
}));

const Container = styled('div')(({ theme }) => ({
  width: '100%',
  // maxWidth: theme.breakpoints.values.xl,
  margin: '0 auto',
  height: 'auto',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'stretch',

  // background: "url('/images/Background.png')",
  // backgroundRepeat: 'no-repeat',
  // backgroundAttachment: 'fixed',
  // backgroundSize: 'cover',
}));

const ContentContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  // gap: theme.spacing(2),
}));

const LeftGrid = styled(Box)(({ theme }) => ({
  display: 'flex',
  maxWidth: '557px',
  flexGrow: 1,
  justifyContent: 'center',
  padding: theme.spacing(3),
  paddingBottom: '12%',
  paddingTop: TOP_PADDING,
  flexDirection: 'column',
  backgroundColor: '#fff',
  boxShadow: '4px 0  4px rgb(0 0 0 / 18%)',

  [theme.breakpoints.down('md')]: {
    maxWidth: '100%',
  },
}));

const RightGrid = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexGrow: 1,
  // maxWidth: '883px',
  padding: theme.spacing(3),
  paddingTop: TOP_PADDING,
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

export type ExposedLayoutProps = {
  rightContent?: ReactNode;
  leftContent?: ReactNode;
};

export default function ExposedLayout({ rightContent, leftContent }: ExposedLayoutProps) {
  return (
    <LayoutContainer>
      <Navbar fullWidth />
      <Container>
        <ContentContainer>
          <LeftGrid>{leftContent}</LeftGrid>
          <RightGrid>{rightContent}</RightGrid>
        </ContentContainer>
      </Container>
    </LayoutContainer>
  );
}
