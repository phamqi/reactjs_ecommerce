import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';

import CartItem from './CartItem';
import { addOnToCart, clearCart, decreaseOnCart, removeFromCart } from './cartSlice';
import EmptyCart from './EmptyCart';
import { cartTotalSelector } from './selector';
import { MESSAGEBOX } from '../../constants/index';

Cart.propTypes = {};
const useStyles = makeStyles((theme) => ({
  btnOption: {
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
    border: '1px solid #717fe0 ',
    backgroundColor: 'white',
    color: '#717fe0',
    padding: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    borderRadius: '3px',
    margin: '0px 15px',
    '&:hover': {
      backgroundColor: '#717fe0',
      color: 'white',
    },
  },
  checkout: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '1rem 0 0 0',
    background: 'white',
    padding: '10px 10px',
    borderBottom: '1px solid rgba(0,0,0,0.2)',
    borderRadius: 'max(0px, min(5px, calc((100vw - 600px) * 99999)))',
  },
  btnClear: {
    fontSize: '1rem',
    fontWeight: '600',
    padding: '8px 1.1rem 10px',
    border: '1px solid #ee4d2d ',
    color: '#ee4d2d',
    borderRadius: '4px',
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: '#ee4d2d',
      color: 'white',
    },
  },
  checkoutTotal: {
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
  setWidth: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%',
    maxWidth: '1200px',
  },
}));

function Cart(props) {
  document.querySelector('meta[name="description"]').innerText = 'Your page description';
  const [staticCheckout, setStaticCheckout] = useState(false);
  const dispatch = useDispatch();
  const classes = useStyles();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const total = useSelector(cartTotalSelector);
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = async (item, typeHandle) => {
    //1: xoa san pham
    //2: them 1 sam pham
    //3: xoa 1 san pham
    if (typeHandle === 1) {
      try {
        const action = removeFromCart({ id: item.id });
        dispatch(action);
        enqueueSnackbar(`${MESSAGEBOX.remove}`, { variant: 'error' });
      } catch (error) {}
    }
    if (typeHandle === 2) {
      try {
        const action = addOnToCart({
          id: item.id,
          product: item.product,
          quantity: item.quantity,
        });
        await dispatch(action);
        enqueueSnackbar(`${MESSAGEBOX.add}`, { variant: 'success' });
      } catch (error) {}
    }
    if (typeHandle === 3) {
      try {
        if (item.quantity <= 1) {
          const action = removeFromCart({ id: item.id });
          dispatch(action);
          enqueueSnackbar(`${MESSAGEBOX.remove}`, { variant: 'error' });
        } else {
          const action = decreaseOnCart({
            id: item.id,
            quantity: item.quantity,
          });
          await dispatch(action);
          enqueueSnackbar(`${MESSAGEBOX.decrease}`, { variant: 'error' });
        }
      } catch (error) {}
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
    } catch (error) {}
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
      } catch (error) {}
    });
  }, []);

  return (
    <div className="cartPage">
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
                <button className={classes.btnClear} onClick={() => handleClearCart}>
                  Clear
                </button>
                <Box
                  id="div_checkout"
                  className={staticCheckout ? classes.checkoutTotal : classes.static}
                >
                  <Box className={classes.setWidth}>
                    <span className={classes.priceTotal}>
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
