import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Auth from '../Auth';

import { logout } from '../Auth/userSlice';
import BadgeCart from './BadgeCart';
import NavBarMobile from './NavBarMobile';
import SearchBox from './SearchBox';

Bellow.propTypes = {};

function Bellow(props) {
  const useStyles = makeStyles((theme) => ({
    root: {},
    roots: {
      width: '100%',
      backgroundColor: 'black',
    },
    headerStatic: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row ',
      top: '40px',
      left: '0',
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
      width: '100vw',
      backgroundColor: 'transparent',
    },
    headerFixed: {
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
      animation: `$myEffect 200ms ease-in-out`,
    },
    header: {
      width: '100%',
      maxWidth: '1200px',
      height: '70px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: 'transparent',
      padding: '0 30px',
      '& .headerMenu': {
        marginLeft: '1rem',
        '&> a': {
          textDecoration: 'none',
          padding: '5px 0 5px 20px',
          color: 'black',
          fontSize: '0.9rem',
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
      height: '17px',
    },
  }));
  const classes = useStyles();
  const [navBar, setNavBar] = useState(false);

  const navBarOnScroll = useCallback(() => {
    if (window.scrollY >= 40) {
      setNavBar(true);
    } else {
      setNavBar(false);
    }
  }, []);
  useEffect(() => {
    window.addEventListener('scroll', navBarOnScroll);
  }, []);

  const location = useLocation();
  const isHome = useMemo(() => {
    if (location.pathname === '/') {
      return true;
    } else {
      return false;
    }
  }, [location]);

  return (
    <Box
      className={
        navBar
          ? classes.headerFixed
          : classes.headerStatic +
            ' ' +
            (isHome ? classes.positionFixed : classes.positionStatic)
      }
    >
      <Box className={classes.header}>
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
          <Box sx={{ display: { xs: 'block', sm: 'block', md: 'block' } }}>
            {/* BadgeCart */}
            <BadgeCart />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default memo(Bellow);
