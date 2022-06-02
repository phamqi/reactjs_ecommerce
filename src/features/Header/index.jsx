import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloseIcon from '@mui/icons-material/Close';
import CodeOffIcon from '@mui/icons-material/CodeOff';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Typography } from '@mui/material';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import * as React from 'react';
import { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import productApi from '../../api/productApi';
import { BG_COLOR } from '../../constants/index';
import Login from '../Auth/components/Login';
import Register from '../Auth/components/Register';
import { logout } from '../Auth/userSlice';
import { cartItemsCountSelector } from '../Cart/selector';
import Product from '../Products/components/Product';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import useCategoryList from '../Products/hook/useCategoryList';
import GoToByCategory from '../Products/components/GoToByCategory';
const MODE = {
  LOGIN: 'login',
  REGISTER: 'register',
};
Header.propTypes = {};

function Header(props) {
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
      position: 'fixed',
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
    headerBotFixed: {
      borderBottom: '1px solid rgba(0,0,0,0.5)',
      zIndex: '9999',
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
      padding: '0px 10px',
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
    headerul: {
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
    liuser: {
      position: 'relative',
      '&:hover #uluser': {
        opacity: '1',
        visibility: 'visible',
      },
    },
    uluser: {
      backgroundColor: 'white',
      top: '85%',
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
    searchBox: {
      boxSizing: 'border-box',
      boxShadow:
        '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
      borderRadius: '4px',
      position: 'absolute',
      overflowY: 'auto',
      overflowX: 'hidden',
      '&  input': {
        boxSizing: 'border-box',
        width: 'max(100%, min(30vw, calc((100vw - 600px) * 99999)))',
        fontSize: '1rem',
        padding: '5px 0px 5px 15px',
        height: '32px',
        borderRadius: '2px',
        border: 'none',
      },
      '&  input:focus': {
        outline: 'none',
      },
    },
    productBox: {
      maxHeight: '60vh',
      minHeight: '30vh',
      backgroundColor: 'rgba(255,255,255,0.8)',
      opacity: '1',
      overflowY: 'auto',
      overflowX: 'hidden',
      '&::-webkit-scrollbar': {
        width: '0.5rem',
      },
      '&::-webkit-scrollbar-track': {
        '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.3)',
        backgroundColor: '#F5F5F5',
        borderRadius: '10px',
      },
      '&::-webkit-scrollbar-thumb': {
        borderRadius: '10px',
        backgroundImage:
          '-webkit-gradient(linear,left bottom, left top,color-stop(0.44, rgb(122,153,217)),color-stop(0.72, rgb(73,125,189)),color-stop(0.86, rgb(28,58,148)))',
      },
      '& > div': {
        padding: '0',
        width: '100%',
        opacity: '1',
      },
    },
    container: {
      maxWidth: '1200px',
      width: '100%',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    boxInput: {
      '&> button.btnCloseSearch': {
        position: 'absolute',
        top: '0',
        right: '0',
        height: '26px',
        margin: '3px',
        boxSizing: 'content-box',
        backgroundColor: 'transparent',
        minWidth: '35px',
        padding: '0',
        fontSize: '1rem',
        color: 'black',
        borderRadius: '2px',
      },
    },
    iconSearchOff: {
      textAlign: 'center',
      margin: '0',
      '& > svg': {
        color: 'rgba(128,128,128, 0.5)',
        fontSize: '3rem',
        marginTop: '20%',
      },
    },
    option: {
      textAlign: 'center',
      cursor: 'pointer',
      margin: '1rem',
      fontSize: '1rem',
      '& > span:hover': {
        textDecoration: 'underline',
      },
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
  }));
  const classes = useStyles();
  const loggedUser = useSelector((state) => state.user.current);
  const dispatch = useDispatch();
  const isLogged = loggedUser.id;
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(MODE.LOGIN);
  const [navBar, setNavBar] = useState(false);
  const [pxX, setPxX] = useState(30);
  const [pxL, setPxL] = useState(30);
  const [openSearch, setOpenSearch] = useState(false);
  const [listSearch, setListSearch] = useState([]);
  const [loadSearch, setLoadSearch] = useState(false);
  const redirectLogin = () => {
    setMode(MODE.LOGIN);
  };
  const onChangeSearch = (e) => {
    (async () => {
      try {
        const data = await productApi.search(e.target.value);
        setListSearch(data);
        setLoadSearch(true);
      } catch (error) {}
    })();
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleLoguotClick = () => {
    dispatch(logout());
  };
  const handelSearchClick = () => {
    setOpenSearch(true);
  };
  const navBarOnScroll = () => {
    if (window.scrollY >= 40) {
      setNavBar(true);
    } else {
      setNavBar(false);
    }
  };
  window.addEventListener('scroll', navBarOnScroll);
  const handleMoveOnTouch = (e) => {
    setPxX(window.innerWidth - e.touches[0].clientX);
    setPxL(window.innerHeight - e.touches[0].clientY);
  };
  const handleChangeSearch = () => {
    setOpenSearch(false);
  };
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };
  const handleSearchMb = () => {
    handleScrollToTop();
    setOpenSearch(!openSearch);
  };

  const countItems = useSelector(cartItemsCountSelector);

  const { categoryList, categoryOnLoad } = useCategoryList();

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
                  <ul className={classes.headerul}>
                    <li>FAQs</li>
                    <li>Contact</li>
                    {isLogged ? (
                      <li className={classes.liuser}>
                        <a> {loggedUser.fullName.split(' ').pop()}</a>
                        <ul id="uluser" className={classes.uluser}>
                          <li>
                            <Link to="/profiles">Profiles</Link>
                          </li>
                          <li onClick={handleLoguotClick}>Logout</li>
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
          id="header_bot"
          className={navBar ? classes.headerBotFixed : classes.headerBot}
        >
          <Box id="header_bots" className={classes.headerBotS}>
            <Box>
              <NavLink to="/">
                <CodeOffIcon />
              </NavLink>
              <Box className="headerMenu" sx={{ display: { xs: 'none', sm: 'flex' } }}>
                <NavLink to="/">Shop</NavLink>
                <NavLink to="/feature">Featured</NavLink>
                <NavLink to="/about">About</NavLink>
              </Box>
            </Box>

            <Box
              sx={{
                width: { xs: '100%', sm: 'auto' },
                justifyContent: { xs: 'flex-end' },
                display: { xs: 'flex', sm: 'flex' },
                alignItems: 'center',
              }}
            >
              <Box sx={{ position: 'relative' }}>
                <IconButton
                  onClick={handelSearchClick}
                  aria-label="menu"
                  sx={{ my: 1, mx: 1, px: 1, color: 'black' }}
                >
                  <SearchIcon />
                </IconButton>
                {openSearch ? (
                  <Box
                    sx={{
                      maxWidth: '620px',
                      width: { xs: '100vw', sm: '40vw' },
                      top: { xs: '0', sm: '20%' },
                      right: { xs: '-36%', sm: '20%' },
                    }}
                    className={classes.searchBox}
                  >
                    <Box className={classes.boxInput}>
                      <input
                        type="text"
                        onChange={(e) => onChangeSearch(e)}
                        placeholder="Search..."
                      />
                      <Button className="btnCloseSearch" onClick={handleChangeSearch}>
                        <CloseIcon />
                      </Button>
                    </Box>
                    <Box>
                      <Box className={classes.productBox}>
                        {loadSearch ? (
                          listSearch.map((item) => <Product product={item} />)
                        ) : (
                          <h2 className={classes.iconSearchOff}>
                            <SearchOffIcon />
                          </h2>
                        )}
                      </Box>
                      <Box sx={{ backgroundColor: 'white' }}>
                        <GoToByCategory
                          categoryList={categoryList}
                          categoryOnLoad={categoryOnLoad}
                        />
                      </Box>
                    </Box>
                  </Box>
                ) : (
                  ''
                )}
              </Box>
              <Box sx={{ display: { xs: 'none', sm: 'block', md: 'block' } }}>
                <NavLink to="/cart">
                  <IconButton sx={{ color: 'black' }}>
                    <Badge badgeContent={countItems} color="error">
                      <ShoppingCartIcon />
                    </Badge>
                  </IconButton>
                </NavLink>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          zIndex: '9999',
          display: { xs: 'block', sm: 'none' },
          position: 'fixed',
          top: 'auto',
          bottom: `${pxL}px`,
          left: 'auto',
          right: `${pxX}px`,
          transform: 'translateZ(0px)',
          flexGrow: 1,
          opacity: '1',
        }}
      >
        <SpeedDial
          sx={{
            'button.MuiSpeedDial-fab': {
              width: '3.5rem',
              height: '3.5rem',
              background: `${BG_COLOR}`,
              zIndex: '20',
              opacity: '0.7',
            },
          }}
          onTouchMove={handleMoveOnTouch}
          ariaLabel="SpeedDial basic example"
          icon={<SpeedDialIcon />}
        >
          <SpeedDialAction
            key="1"
            icon={
              <NavLink sx={{ color: 'black' }} to="/">
                <HomeIcon />
              </NavLink>
            }
            tooltipTitle="Home"
          />
          <SpeedDialAction
            key="2"
            icon={
              <NavLink to="/cart">
                <IconButton sx={{ color: 'black' }}>
                  <Badge badgeContent={countItems} color="error">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
              </NavLink>
            }
          />
          <SpeedDialAction
            key="3"
            icon={<SearchIcon onClick={handleSearchMb} />}
            tooltipTitle="Filter"
          />
          <SpeedDialAction
            key="4"
            icon={<ExpandLessIcon onClick={handleScrollToTop} />}
            tooltipTitle="Back to Top"
          />
        </SpeedDial>
      </Box>
      <Dialog open={open}>
        <DialogContent
          sx={{
            maxWidth: '540px',
            width: { xs: '70vw', sm: '55vw', md: ' 25vw' },
            overflowY: 'hidden',
          }}
        >
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={handleClose}>
              <CloseIcon sx={{ color: 'black' }} />
            </Button>
          </Box>
          {mode === MODE.LOGIN && (
            <>
              <Login closeDialog={handleClose} />
              <Box className={classes.option}>
                <span onClick={() => setMode(MODE.REGISTER)}>Singup</span>
              </Box>
            </>
          )}
          {mode === MODE.REGISTER && (
            <>
              <Register redirectLogin={redirectLogin} />
              <Box className={classes.option}>
                <span onClick={() => setMode(MODE.LOGIN)}>Singin</span>
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;
