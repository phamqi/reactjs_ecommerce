import CodeOffIcon from '@mui/icons-material/CodeOff';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Typography } from '@mui/material';
import Badge from '@mui/material/Badge';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import Auth from '../Auth';

import { logout } from '../Auth/userSlice';
import MiniCart from '../Cart/MiniCart';
import { cartItemsCountSelector } from '../Cart/selector';
import NavBarMobile from './NavBarMobile';
import SearchBox from './SearchBox';

Header.propTypes = {};

function Header(props) {
  const [openMiniCart, setOpenMiniCart] = useState(false);
  const handleCloseMiniCart = () => {
    setOpenMiniCart(false);
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    roots: {
      width: '100%',
      backgroundColor: 'black',
    },
    header: {
      display: 'flex',
      width: '100%',
      flexDirection: 'column',
      position: 'relative',
    },
    headerTop: {
      height: '40px',
      padding: '0px 10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row nowrap',
      backgroundColor: 'black',
      '& p ': {
        color: 'white',
        fontSize: '0.9rem',
      },
    },
    headerBot: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row ',
      top: '40px',
      left: '0',
      width: '100%',
      zIndex: '9',
      '&> a': {
        color: 'black',
        fontSize: '1.2rem',
        padding: '8px 20px 8px 20px',
        transitionDuration: '1s ease',
      },
    },
    positionStatic: {
      position: 'static',
      backgroundColor: 'white',
      borderBottom: '1px solid rgba(0,0,0,0.5)',
    },
    positionFixed: {
      position: 'fixed',
      backgroundColor: 'transparent',
    },
    headerBotFixed: {
      borderBottom: '1px solid rgba(0,0,0,0.5)',
      zIndex: '999',
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
      animation: `$myEffect 500ms ease-in-out`,
    },
    headerBotS: {
      width: '100%',
      maxWidth: '1200px',
      padding: '0px 15px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: 'transparent',
      '&> div': { display: 'flex' },
      '& .headerMenu': {
        '&> a': {
          textDecoration: 'none',
          padding: '5px 20px',
          color: 'black',
          fontSize: '1.1rem',
          '&:visited': {
            color: 'rgba(0,0,0,0.7)',
          },
          '&:hover': {
            color: 'black',
          },
        },
      },
    },
    headerUl: {
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      '&> li': {
        color: 'white',
        padding: '10px 20px',
        borderRight: '1px solid #D3D3D3',
        '&:last-child': {
          textAlign: 'center',
          minWidth: '40px',
          borderRight: 'none',
          paddingRight: '0px',
          maxWidth: '60px',
          overFlow: 'hidden',
        },
      },
    },
    liUser: {
      position: 'relative',
      '&:hover $ulUser': {
        opacity: '1',
        visibility: 'visible',
      },
    },
    ulUser: {
      backgroundColor: 'white',
      top: '70%',
      right: '0',
      visibility: 'hidden',
      position: 'absolute',
      opacity: '0',
      borderRadius: '5px',
      boxShadow: '2px 2px 5px black',
      zIndex: '10',
      padding: '15px',
      '&> li': {
        cursor: 'pointer',
        color: 'black',
        padding: '6px 0',
        '&:visited': {
          color: 'black',
        },
        '&> a': {
          textDecoration: 'none',
          color: 'black',
        },
      },
    },
    container: {
      maxWidth: '1200px',
      width: '100%',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    btnScrollToTop: {
      position: 'fixed',
      bottom: '50%',
      right: '20px',
      backgroundColor: 'red',
    },
    up: {
      opacity: '1',
    },
    '@keyframes myEffect': {
      '0%': {
        opacity: '0.3',
        top: '40px',
      },
      '100%': {
        opacity: '1',
        top: '0px',
      },
    },
    btnCart: {
      backgroundColor: 'transparent',
      margin: '0',
      padding: '0',
      border: 'none',
    },
    dialogMiniCart: {
      display: 'block',
      '& .MuiDialog-container ': {
        position: 'relative',
        justifyContent: 'flex-end',
        '& .MuiPaper-root': {
          width: 'max(60vw, min(100vw, (calc((600px - 100vw)*99999))))',
          margin: '0',
          maxHeight: '100vh',
          height: '100vh',
          border: 'none',
          borderRadius: '0',
          maxWidth: '610px',
          animation: `${
            openMiniCart ? '$dialogAnimation' : '$dialogAnimationExit'
          } 0.5s ease-in-out`,
          '& .MuiDialogContent-root ': {
            overFlow: 'hidden',
            padding: '0',
            overflowY: 'hidden',
          },
        },
      },
    },
    '@keyframes dialogAnimation': {
      '0%': {
        opacity: '0',
        transform: 'translateX(100%)',
      },
      '100%': {
        opacity: '1',
        transform: 'translateX(0%)',
      },
    },
    '@keyframes dialogAnimationExit': {
      '0%': {
        opacity: '1',
        transform: 'translateX(0%)',
      },
      '100%': {
        opacity: '0',
        transform: 'translateX(100%)',
      },
    },
  }));
  const classes = useStyles();
  const loggedUser = useSelector((state) => state.user.current);
  const dispatch = useDispatch();
  const isLogged = loggedUser.id;
  const [navBar, setNavBar] = useState(false);

  const [openAuth, setOpenAuth] = useState(false);
  const handleCloseAuth = () => {
    setOpenAuth(false);
  };

  const handleClickOpen = () => {
    setOpenAuth(true);
  };
  const handleClose = () => {
    setOpenAuth(false);
  };
  const handleLogOutClick = () => {
    dispatch(logout());
  };

  const navBarOnScroll = () => {
    if (window.scrollY >= 40) {
      setNavBar(true);
    } else {
      setNavBar(false);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', navBarOnScroll);
  }, []);

  const countItems = useSelector(cartItemsCountSelector);

  const [positionHeader, setPositionHeader] = useState(false);
  useEffect(() => {
    if (window.location.href === window.location.origin + '/') {
      setPositionHeader(true);
    }
  }, []);

  return (
    <div className={classes.root}>
      <Box className={classes.header}>
        <div className={classes.roots}>
          <Box className={classes.container}>
            <Box className={classes.header}>
              <Box className={classes.headerTop}>
                <Typography sx={{ opacity: { xs: '0', sm: '1' } }}>
                  Buy for Freeship
                </Typography>
                <Box>
                  <ul className={classes.headerUl}>
                    <li>FAQs</li>
                    <li>Contact</li>
                    {isLogged ? (
                      <li className={classes.liUser}>
                        <p> {loggedUser.fullName.split(' ').pop()}</p>
                        <ul className={classes.ulUser}>
                          <li>
                            <Link to="/profiles">Profiles</Link>
                          </li>
                          <li onClick={handleLogOutClick}>Logout</li>
                        </ul>
                      </li>
                    ) : (
                      <li onClick={handleClickOpen}>Login</li>
                    )}
                  </ul>
                </Box>
              </Box>
            </Box>
          </Box>
        </div>
        <Box
          className={
            navBar
              ? classes.headerBotFixed
              : classes.headerBot +
                ' ' +
                (positionHeader ? classes.positionFixed : classes.positionStatic)
          }
        >
          <Box className={classes.headerBotS}>
            <Box>
              <NavLink to="/">
                <CodeOffIcon />
              </NavLink>
              <Box className="headerMenu" sx={{ display: { xs: 'none', sm: 'flex' } }}>
                <a href="/">Shop</a>
                <a href="/featured">Featured</a>
                <a href="/about">About</a>
              </Box>
            </Box>
            {/*search */}
            <Box
              sx={{
                width: { xs: '100%', sm: 'auto' },
                justifyContent: { xs: 'flex-end' },
                display: { xs: 'flex', sm: 'flex' },
                alignItems: 'center',
              }}
            >
              <SearchBox />
              <Box sx={{ display: { xs: 'none', sm: 'block', md: 'block' } }}>
                <button
                  onClick={() => setOpenMiniCart(!openMiniCart)}
                  className={classes.btnCart}
                >
                  <IconButton sx={{ color: 'black' }}>
                    <Badge badgeContent={countItems} color="error">
                      <ShoppingCartIcon />
                    </Badge>
                  </IconButton>
                </button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      {/* Navbar mobile */}
      <NavBarMobile />
      {/* Login Register */}
      <Auth openAuth={openAuth} handleCloseAuth={handleCloseAuth} />

      {/* Mini cart */}
      <Dialog
        className={classes.dialogMiniCart}
        open={openMiniCart}
        disableScrollLock={true}
        onClose={handleCloseMiniCart}
      >
        <DialogContent className={classes.dialogContent}>
          <MiniCart onCloseMiniCart={handleCloseMiniCart} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;
