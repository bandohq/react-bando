import Box, { BoxProps } from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { ListItem, List } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useCallback, useEffect, useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Logo from '../../assets/logo.svg';
import LogoWhite from '../../assets/logo_white.svg';
import Telegram from '../../assets/telegram.svg';
import UserMenu from '@components/UserMenu';
import BandoButton from '@components/Button';
import UserCard from '@components/UserCard';
import useUser from '@hooks/useUser';
import DrawerLink from './DrawerLink';
import TransactionsIcon from '../../assets/transactions.svg';
import LogoutIcon from '@components/Svgs/Logout';

const NavbarContainer = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0)',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '12px',
  display: 'flex',
  position: 'fixed',
  zIndex: theme.zIndex.appBar,
  color: theme.palette.primary.main,
  transition: theme.transitions.create(['background-color']),
  '&.scrolled': {
    backgroundColor: theme.palette.primary.main,
    boxShadow: theme.shadows[4],
  },
  '&.scrolled #telegram-nav-button': {
    color: theme.palette.primary.contrastText,
  },
  '&.scrolled #user-nav-button': {
    color: theme.palette.primary.contrastText,
  },
  '&.scrolled #login-button': {
    color: theme.palette.primary.contrastText,
  },
  '& .navbar-box': {
    width: '100%',
    maxWidth: theme.breakpoints.values.xl,
    margin: 0,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '&.full-width': {
      maxWidth: '100%',
    },
  },
  '& .navbar-brand': {
    height: '100%',
    paddingLeft: 0,
    textDecoration: 'none',
  },
  '& img': {
    width: '100%',
    maxWidth: '120px',
    height: 'auto',
    verticalAlign: 'middle',
    display: 'inline-block',
    [theme.breakpoints.between('xs', 'sm')]: {
      maxWidth: '90px',
    },
  },
  '& .navbar-menu': {
    display: 'flex',
    alignItems: 'center',
    '& img.telegram-icon': {
      width: 30,
      height: 30,
      marginLeft: theme.spacing(1),
    },
  },
  [theme.breakpoints.between('xs', 'sm')]: {
    '& #user-nav-button': {
      display: 'none',
    },
    '& .navbar-menu button, .navbar-menu a': {
      fontSize: theme.typography.pxToRem(13),
    },
  },
}));

const StyledDrawer = styled(SwipeableDrawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: 250,
    backgroundImage: "url('/images/bg-drawer.png')",
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    color: theme.palette.primary.main,
  },
}));

export default function Navbar({ fullWidth = false }) {
  const [isOnTop, setIsOnTop] = useState(true);
  const { user, isLoading, isMagicLoading, isLoginOut } = useUser();
  const isUserInfoLoading = isLoading || isMagicLoading || isLoginOut;

  const navigate = useNavigate();
  const { t } = useTranslation('userMenu');

  const handleScroll = useCallback(() => {
    const isCurrentScropOnTop = window.scrollY <= 30;
    setIsOnTop(isCurrentScropOnTop);
  }, []);

  const handleLoginClick = async () => {
    navigate('/signin');
  };

  const handleStartClick = async () => {
    navigate('/signup');
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const [open, setOpen] = useState(false);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setOpen(open);
  };

  const list = () => (
    <Box component="div" sx={{ width: 250 }} role="presentation">
      <List>
        {[
          <DrawerLink
            to="/transactions"
            icon={<img src={TransactionsIcon} alt="Transactions" />}
            text={t('viewTxnHistory')}
          />,
          <DrawerLink to="logout" icon={<LogoutIcon strokeWidth={1.5} />} text={t('signout')} />,
        ].map((comp, index) => (
          <ListItem key={index} disablePadding>
            {comp}
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <NavbarContainer
      data-animation="default"
      data-collapse="none"
      data-duration="400"
      data-easing="ease"
      data-easing2="ease"
      className={isOnTop ? '' : 'scrolled'}
      aria-label={isOnTop ? 'scrollTop' : 'scrolled'}
    >
      <div className={fullWidth ? 'navbar-box full-width' : 'navbar-box'}>
        <a href="/" className="navbar-brand">
          <img src={isOnTop ? Logo : LogoWhite} loading="lazy" alt="" aria-label="Bando logo" />
        </a>
        <div className="telegram-logo-box">
          <nav role="navigation" className="navbar-menu">
            <BandoButton
              component="a"
              id="telegram-nav-button"
              variant="text"
              size="small"
              className="rounded"
              sx={{
                py: '0 !important',
                display: { xs: 'none', sm: 'block' },
              }}
              onClick={() => window.open('https://t.me/+ZUfDxp78dwAwMDcx', '_blank')}
            >
              {t('joinTg')}
              <img
                className="telegram-icon"
                src={Telegram}
                loading="lazy"
                alt=""
                aria-label="Telegram Logo"
              />
            </BandoButton>
            <UserMenu isOnTop={isOnTop} disabled={isUserInfoLoading} />
            {!user?.email && (
              <>
                <Box>
                  <Button
                    id="login-button"
                    onClick={handleLoginClick}
                    sx={{
                      textTransform: 'none',
                      fontWeight: 700,
                      display: 'flex',
                      gap: 1,
                      color: 'primary.main',
                    }}
                    disabled={isUserInfoLoading}
                  >
                    {t('signin')}
                  </Button>
                </Box>
                <Box>
                  <Button
                    id="signup-button"
                    onClick={handleStartClick}
                    sx={{
                      backgroundColor: '#5760df !important',
                      textTransform: 'none',
                      fontWeight: 700,
                      display: 'flex',
                      gap: 1,
                      color: 'primary.contrastText',
                    }}
                    disabled={isUserInfoLoading}
                  >
                    {t('signup')}
                  </Button>
                </Box>
              </>
            )}
            {!!user?.email && (
              <Fragment>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="end"
                  onClick={toggleDrawer(true)}
                  sx={{ display: { xs: 'block', sm: 'none' } }}
                >
                  <MenuIcon
                    sx={isOnTop ? { color: 'primary.main' } : { color: 'primary.contrastText' }}
                  />
                </IconButton>
                <StyledDrawer
                  anchor="right"
                  open={open}
                  onClose={toggleDrawer(false)}
                  onOpen={toggleDrawer(true)}
                >
                  <ListItem key="user-card">
                    <UserCard user={user} />
                  </ListItem>
                  <Divider />
                  {list()}
                </StyledDrawer>
              </Fragment>
            )}
          </nav>
        </div>
      </div>
    </NavbarContainer>
  );
}
