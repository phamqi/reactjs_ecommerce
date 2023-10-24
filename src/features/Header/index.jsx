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
import Bellow from './Bellow';

Header.propTypes = {};

function Header(props) {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      width: '100%',
      flexDirection: 'column',
      position: 'relative',
      backgroundColor: '#000',
    },
    header: {
      width: '100%',
      backgroundColor: 'black',
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

    headerUl: {
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      height: '40px',
      zIndex: '10',
      '&> li': {
        zIndex: '10',
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
          flexShrink: '0',
          position: 'relative',
          '&:hover $ulUser': {
            opacity: '1',
            visibility: 'visible',
          },
        },
      },
    },
    ulUser: {
      backgroundColor: 'white',
      top: '40px',
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
        padding: '6px 0',
        color: '#0000005e',
        '&:visited': {
          color: 'black',
        },
        '&> a': {
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'none',
            color: '#717fe0',
          },
        },
        '&:hover': {
          textDecoration: 'none',
          color: '#717fe0',
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
  }));
  const classes = useStyles();

  const loggedUser = useSelector((state) => state.user.current);
  const dispatch = useDispatch();
  const isLogged = loggedUser.id;

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
  return (
    <div>
      <Box className={classes.root}>
        <Box className={classes.container}>
          <Box className={classes.header}>
            <Box className={classes.headerTop}>
              <Typography sx={{ opacity: { xs: '0', sm: '1' } }}>
                Free shipping for standard order over $10
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
        <Bellow />
      </Box>
      {/* Navbar mobile */}
      <NavBarMobile />
      {/* Login Register */}
      <Auth openAuth={openAuth} handleCloseAuth={handleCloseAuth} />
    </div>
  );
}

export default memo(Header);
