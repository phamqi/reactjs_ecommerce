import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Button, Container, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BG_COLOR, IMG_URL, STATIC_HOST } from '../../constants/index';
import Header from '../Header';
import { addOnToCart, clearCart, dereaseOnCart, removeFromCart } from './cartSlice';
import EmptyCart from './EmptyCart';
import { cartTotalSelector } from './selector';

Cart.propTypes = {};
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'white',
    margin: '1rem 0 0 0',
    display: 'flex',
    padding: '0  0 0  0.7rem',
    borderRadius: 'max(0px, min(5px, calc((100vw - 600px) * 99999)))',
    borderBottom: '1px solid rgba(0,0,0,0.2)',
    overflow: 'hidden',
    position: 'relative',
  },
  img: {
    backgroundPosition: '50%',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    width: '85px',
    height: '85px',
    marginLeft: 'max(0px, min(2rem, calc((100vw - 899px) * 99999)))',
  },
  inforTop: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    zIndex: '1',
    alignItems: 'center',
    transition: 'all 0.5s linear',
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  inforTopActive: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    zIndex: '1',
    transform: 'translateX(-10rem)',
    alignItems: 'center',
    justifyContent: 'space-between',
    transition: 'all 0.5s linear',
    backgroundColor: 'white',
  },
  inforCart: {
    transition: 'all 0.5s linear',
    backgroundColor: 'white',
    zIndex: '1',
    width: '100%',
    display: 'flex',
    padding: '10px',
    justifyContent: 'space-between',
  },
  control: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlQuantity: {
    display: 'flex',
    alignItems: 'center',
    '& > input': {
      fontSize: '1rem',
      padding: '0px',
      textAlign: 'center',
      width: '30px',
      border: '1px solid rgba(0,0,0,0.2)',
      height: '30px',
    },
    '& > button': {
      backgroundColor: 'white',
      width: '32px',
      height: '32px',
      padding: '0',
      border: '1px solid rgba(0,0,0,0.2)',
      borderRadius: '3px',
    },
  },
  price: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontSize: '1rem',
    color: '#ee4d2d',
    fontWeight: '500',
  },
  pricetotal: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontSize: '1.05rem',
    color: '#ee4d2d',
    fontWeight: '500',
    margin: '0px 10px',
  },
  nameprice: {
    display: 'flex',
    flexDirection: 'column',
    '& > a': {
      minHeight: '34px',
      color: 'black',
      textDecoration: 'none',
      fontSize: '0.9rem',
      display: 'inline-block',
      wordWrap: 'break-word',
      whiteSpace: 'normal',
      overflow: 'hidden',
      display: '-webkit-box',
      textOverflow: 'ellipsis',
      lineHeight: '17px',
      '-webkit-box-orient': 'vertical',
      '-webkit-line-clamp': '2',
    },
  },
  btnoption: {
    '& > button > svg': {
      fontSize: '1rem',
      color: 'black',
      backgroundColor: 'white',
      '&:hover': {
        color: 'red',
        fontSize: '1.05rem',
      },
    },
  },
  btncheckout: {
    backgroundImage: `${BG_COLOR}`,
    color: 'white',
    padding: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    border: '0.5px solid grey',
    borderRadius: '3px',
    margin: '0px 15px',
  },
  checkout: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '1rem 0 0 0',
    background: 'white',
    padding: '10px 10px',
    borderBottom: '1px solid rgba(0,0,0,0.2)',
    borderRadius: 'max(0px, min(5px, calc((100vw - 600px) * 99999)))',
    '& > button': {
      fontSize: '0.7rem',
      '&:hover': {
        fontSize: '0.75rem',
      },
    },
  },
  checkouttotal: {
    position: 'static',
  },
  static: {
    zIndex: '999',
    left: '0',
    position: 'fixed',
    bottom: '0',
    top: 'auto',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    backgroundColor: 'white',
    borderTop: '1px solid rgba(0,0,0,0.2)',
    padding: '10px 0px',
  },
  conta: {
    '& .contai': {
      padding: '0',
    },
  },
  setwidth: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%',
    maxWidth: '1200px',
  },
  divoption: {
    width: '10rem',
    marginRight: 'max(0px, min(1rem, calc((100vw - 899px) * 99999)))',
    textAlign: 'center',
    right: '0',
    top: '0',
    bottom: '0',
    display: 'flex',
    '& > a': {
      textDecoration: 'none',
    },
    '& button': {
      textTransform: 'none',
      borderRadius: '0',
      width: '100%',
    },
    // '& button.btnRemove': {
    //   color: 'red',
    // },
  },
  iconActive: {
    transform: 'rotate(180deg)',
    transition: 'all 0.3s linear',
  },
}));

function Cart(props) {
  const [local, setLocal] = useState(false);
  const [checkoutLocal, setCheckoutLocal] = useState();
  const dispatch = useDispatch();
  const classes = useStyles();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const product = cartItems.product;
  console.log(product);
  const checkoutRef = useRef();
  const handleDecreaseOnCart = async (item) => {
    try {
      const action = dereaseOnCart({
        id: item.id,
        quantity: item.quantity,
      });
      await dispatch(action);
      console.log('xoa thnah cong', action);
    } catch (error) {
      console.log('loi o xoa 1 cai', error);
    }
  };
  const handleAddToCart = async (item) => {
    try {
      const action = addOnToCart({
        id: item.id,
        product: item.product,
        quantity: item.quantity,
      });
      await dispatch(action);
      console.log('them moi thnah cong', action);
    } catch (error) {
      console.log('loi o details', error);
    }
  };
  const onChangeInput = async (item) => {};
  const handleRemove = async (item) => {
    try {
      const action = removeFromCart({ id: item.id });
      dispatch(action);
    } catch (error) {
      console.log('loi khi xoa', error);
    }
  };
  const handleClearCart = () => {
    const action = clearCart();
    dispatch(action);
  };
  const total = useSelector(cartTotalSelector);
  useEffect(() => {
    setCheckoutLocal(checkoutRef.current.getBoundingClientRect().y);
  });
  const setLocation = () => {
    if (window.scrollY > checkoutLocal / 2) {
      setLocal(true);
    } else {
      setLocal(false);
    }
  };
  window.addEventListener('scroll', setLocation);
  const [activeDiv, setActiveDiv] = useState();
  const [toggle, setToggle] = useState(false);
  var startX, moveX;
  const handelMoveStart = (e) => {
    startX = e.touches[0].clientX;
  };
  const handelMove = (e) => {
    moveX = e.touches[0].clientX;
  };
  const goToCategory = (item) => {
    console.log('item', item.product.category.id);
  };
  const category = cartItems.map((item, index, cartItems) => {
    return item.product.category.id;
  });
  console.log('b', category);
  return (
    <div className="cartpage">
      <Box className={classes.conta}>
        <Container className="contai">
          {cartItems.length === 0 ? (
            <EmptyCart />
          ) : (
            <Box>
              {cartItems.map((item, index) => (
                <div
                  className={classes.root}
                  key={index}
                  onTouchStart={handelMoveStart}
                  onTouchMove={handelMove}
                  onTouchEnd={(e) => {
                    if (startX - 30 > moveX) {
                      setActiveDiv(item.id);
                      setToggle(true);
                    }
                    if (startX + 30 < moveX) {
                      setActiveDiv(item.id);
                      setToggle(false);
                    }
                  }}
                >
                  <Box
                    className={classes.img}
                    sx={{
                      backgroundImage: item.product.thumbnail
                        ? `url(${STATIC_HOST}${item.product.thumbnail?.url})`
                        : `url(${IMG_URL})`,
                    }}
                  />

                  <Box
                    className={
                      toggle && activeDiv === item.id
                        ? classes.inforTopActive
                        : classes.inforTop
                    }
                  >
                    <Box
                      className={classes.inforCart}
                      sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
                    >
                      <Box className={classes.nameprice}>
                        <Link to={item.product.name + '_i' + item.id}>
                          {item.product.name}
                        </Link>
                        <p className={classes.price}>{item.product.salePrice}</p>
                      </Box>
                      <Box
                        sx={{ justifyContent: { xs: 'space-between', sm: '' } }}
                        className={classes.control}
                      >
                        <Box className={classes.controlQuantity}>
                          <IconButton
                            className={classes.button}
                            onClick={() => handleDecreaseOnCart(item)}
                          >
                            <ExpandMoreIcon />
                          </IconButton>
                          <input
                            width="100px"
                            type="number"
                            name="quantity"
                            value={item.quantity}
                            onChange={() => onChangeInput(item)}
                          />
                          <IconButton
                            className={classes.button}
                            onClick={() => handleAddToCart(item)}
                          >
                            <ExpandLessIcon />
                          </IconButton>
                        </Box>
                      </Box>
                    </Box>
                    <Box
                      sx={{ visibility: { xs: 'visible', sm: 'visible', md: 'hidden' } }}
                      className={classes.btnoption}
                    >
                      <Button
                        onClick={() => {
                          setActiveDiv(item.id);
                          setToggle(!toggle);
                        }}
                      >
                        <ArrowBackIosIcon
                          className={
                            toggle && activeDiv === item.id
                              ? classes.iconActive
                              : classes.icon
                          }
                        />
                      </Button>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      position: { xs: 'absolute', sm: 'absolute', md: 'relative' },
                      flexDirection: { xs: 'row ', sm: 'row', md: 'column' },
                    }}
                    className={classes.divoption}
                  >
                    <Button
                      sx={{
                        color: { xs: 'white', sm: 'white', md: 'rgb(73,125,189)' },
                        backgroundColor: {
                          xs: 'rgb(73,125,189)',
                          sm: 'rgb(73,125,189)',
                          md: 'transparent',
                        },
                      }}
                      onClick={() => {
                        goToCategory(item);
                      }}
                    >
                      Related
                    </Button>
                    <Button
                      sx={{
                        color: { xs: 'white', sm: 'white', md: 'red' },
                        backgroundColor: {
                          xs: '#ee4d2d',
                          sm: '#ee4d2d',
                          md: 'transparent',
                        },
                      }}
                      className="btnRemove"
                      onClick={() => {
                        handleRemove(item);
                      }}
                    >
                      Remove
                    </Button>
                  </Box>
                </div>
              ))}
            </Box>
          )}
          <Box ref={checkoutRef} className={classes.checkout}>
            <Button onClick={() => handleClearCart}>Clear</Button>
            <Box className={local ? classes.checkouttotal : classes.static}>
              <Box className={classes.setwidth}>
                <span className={classes.pricetotal}>
                  <span>Total: </span>
                  {new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  }).format(total)}
                </span>
                <button className={classes.btncheckout}>Check Out</button>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </div>
  );
}

export default Cart;
