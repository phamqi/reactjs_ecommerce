import { Box, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useSnackbar } from 'notistack';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { BG_COLOR } from '../../constants/index';
import CartItem from './CartItem';
import { addOnToCart, clearCart, decreaseOnCart, removeFromCart } from './cartSlice';
import EmptyCart from './EmptyCart';
import { cartTotalSelector } from './selector';

Cart.propTypes = {};
const useStyles = makeStyles((theme) => ({
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
  btnCheckout: {
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
  container: {
    maxWidth: '1200px',
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  setwidth: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%',
    maxWidth: '1200px',
  },
}));

function Cart(props) {
  const [staticCheckout, setStaticCheckout] = useState(false);
  const dispatch = useDispatch();
  const classes = useStyles();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const total = useSelector(cartTotalSelector);

  const handleChange = async (item, typeHandle) => {
    //1: xoa san pham
    //2: them 1 sam pham
    //3: xoa 1 san pham
    if (typeHandle === 1) {
      console.log(typeHandle);
      try {
        const action = removeFromCart({ id: item.id });
        dispatch(action);
      } catch (error) {}
    }
    if (typeHandle === 2) {
      console.log(typeHandle);
      try {
        const action = addOnToCart({
          id: item.id,
          product: item.product,
          quantity: item.quantity,
        });
        await dispatch(action);
      } catch (error) {}
    }
    if (typeHandle === 3) {
      console.log(typeHandle);
      try {
        const action = decreaseOnCart({
          id: item.id,
          quantity: item.quantity,
        });
        await dispatch(action);
        console.log('giam 1 thanh cong', action);
      } catch (error) {
        console.log('loi o xoa 1 cai', error);
      }
    }
  };
  const handleClearCart = () => {
    const action = clearCart();
    dispatch(action);
  };

  const div_items = useRef();
  useEffect(() => {
    try {
      if (window.innerHeight > div_items.current.clientHeight) {
        setStaticCheckout(true);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    window.addEventListener('scroll', function () {
      try {
        if (window.scrollY + window.innerHeight > div_items.current.clientHeight - 100) {
          setStaticCheckout(true);
        }
        if (window.scrollY + window.innerHeight < div_items.current.clientHeight - 100) {
          setStaticCheckout(false);
        }
      } catch (error) {
        console.log(error);
      }
    });
  }, []);
  const params = useParams();
  console.log('params', params);
  return (
    <div className="cartpage">
      <Box>
        <Box className={classes.container} ref={div_items}>
          {cartItems.length === 0 ? (
            <EmptyCart />
          ) : (
            <Box>
              {cartItems.map((item, index) => (
                <CartItem item={item} key={index} handleChange={handleChange} />
              ))}
              <Box className={classes.checkout}>
                <Button onClick={() => handleClearCart}>Clear</Button>
                <Box
                  id="div_checkout"
                  className={staticCheckout ? classes.checkouttotal : classes.static}
                >
                  <Box className={classes.setwidth}>
                    <span className={classes.pricetotal}>
                      <span>Total: </span>
                      {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      }).format(total)}
                    </span>
                    <button className={classes.btnCheckout}>Check Out</button>
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </div>
  );
}

export default Cart;
