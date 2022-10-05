import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Auth from '../Auth';

import { logout } from '../Auth/userSlice';
import MiniCart from './MiniCart';
import NavBarMobile from './NavBarMobile';
import SearchBox from './SearchBox';

Header.propTypes = {};

function Header(props) {
  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100vw',
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
      width: '100vw',
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
      padding: '15px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: 'transparent',
      '& .headerMenu': {
        marginLeft: '1rem',
        '&> a': {
          textDecoration: 'none',
          padding: '5px 0 5px 20px',
          color: 'black',
          fontSize: '1.3rem',
          fontWeight: 500,
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
        flexShrink: '1',
        '&:last-child': {
          display: 'block',
          textAlign: 'center',
          minWidth: '40px',
          borderRight: 'none',
          paddingRight: '0px',
          maxWidth: '60px',
          overflow: 'hidden',
          flexShrink: '0',
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
    flexAlignCenter: {
      display: 'flex',
      alignItems: 'center',
    },
    linkIcon: {
      color: '#333',
      '&:visited': {
        color: '#333',
      },
    },
    imgIcon: {
      height: '20px',
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

  const [positionHeader, setPositionHeader] = useState();
  const location = useLocation();
  const appPathname = location.pathname;
  const checkLocation = () => {
    if (appPathname === '/') {
      setPositionHeader(true);
    } else {
      setPositionHeader(false);
    }
  };
  useMemo(() => {
    checkLocation();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [appPathname]);

  return (
    <div className={classes.root}>
      <Box className={classes.header}>
        <div className={classes.roots}>
          <Box className={classes.container}>
            <Box className={classes.header}>
              <Box className={classes.headerTop}>
                <Typography sx={{ opacity: { xs: '0', sm: '1' } }}>
                  Free shipping for standard order over $10
                </Typography>
                <Box>
                  <ul className={classes.headerUl}>
                    <li className="li_header_user">FAQs</li>
                    <li className="li_header_user">Contact</li>
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
            <Box className={classes.flexAlignCenter}>
              <NavLink className={classes.linkIcon} to="/">
                <div className={classes.flexAlignCenter}>
                  <img
                    className={classes.imgIcon}
                    alt="logo"
                    src={`${window.location.origin}/logo.png`}
                  ></img>
                </div>
              </NavLink>
              <Box className="headerMenu" sx={{ display: { xs: 'none', sm: 'flex' } }}>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/products">Shop</NavLink>
                <NavLink to="/featured">Featured</NavLink>
                <NavLink to="/new">New</NavLink>
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
                {/* MiniCart */}
                <MiniCart />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      {/* Navbar mobile */}
      <NavBarMobile />
      {/* Login Register */}
      <Auth openAuth={openAuth} handleCloseAuth={handleCloseAuth} />
    </div>
  );
}

export default Header;
