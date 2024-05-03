import Box, { BoxProps } from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { ListItem, ListItemButton, ListItemText, List } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { useCallback, useEffect, useState, Fragment } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Logo from '../../assets/logo.svg';
import LogoWhite from '../../assets/logo_white.svg';
import Telegram from '../../assets/telegram.svg';
import UserMenu from '@components/UserMenu';
import BandoButton from '@components/Button';
import useUser from '@hooks/useUser';

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

export default function Navbar({ fullWidth = false }) {
  const [isOnTop, setIsOnTop] = useState(true);
  const theme = useTheme();
  const { user } = useUser();
  const navigate = useNavigate();
  const { t } = useTranslation('userMenu');
  const { pathname } = useLocation();

  const handleScroll = useCallback(() => {
    const isCurrentScropOnTop = window.scrollY === 0;
    setIsOnTop(isCurrentScropOnTop);
  }, []);

  const handleLoginClick = async () => {
    navigate('/signin');
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
    <Box
      component="div"
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {[
          <ListItemText primary={user?.email} />,
          <ListItemText primary={'text2'} />,
          <ListItemText primary={'text3'} />,
          <ListItemText primary={'text4'} />,
        ].map((comp, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton>{comp}</ListItemButton>
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
              }}
              onClick={() => window.open('https://t.me/+ZUfDxp78dwAwMDcx', '_blank')}
            >
              Únete
              <img
                className="telegram-icon"
                src={Telegram}
                loading="lazy"
                alt=""
                aria-label="Telegram Logo"
              />
            </BandoButton>
            <UserMenu />
            {!user?.email && pathname !== '/signin' && (
              <Box>
                <Button
                  id="login-button"
                  onClick={handleLoginClick}
                  sx={{
                    textTransform: 'none',
                    fontWeight: 700,
                    display: 'flex',
                    gap: 1,
                    color: isOnTop
                      ? { color: theme.palette.primary.main }
                      : { color: theme.palette.primary.contrastText },
                  }}
                >
                  {t('signin')}
                </Button>
              </Box>
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
                    sx={
                      isOnTop
                        ? { color: theme.palette.primary.main }
                        : { color: theme.palette.primary.contrastText }
                    }
                  />
                </IconButton>
                <SwipeableDrawer
                  anchor="right"
                  open={open}
                  onClose={toggleDrawer(false)}
                  onOpen={toggleDrawer(true)}
                >
                  {list()}
                </SwipeableDrawer>
              </Fragment>
            )}
          </nav>
        </div>
      </div>
    </NavbarContainer>
  );
}
