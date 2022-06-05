import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { useSelector } from 'react-redux';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

import { IMG_URL, STATIC_HOST } from '../../constants';
import { cartTotalSelector } from './selector';

MiniCart.propTypes = {};
const useStyles = makeStyles((theme) => ({
  headerCart: {
    zIndex: '99999',
    height: '100vh',
    padding: '0 40px 20px',
  },
  headerCartTitle: {
    width: '100%',
    height: '13%',
    minHeight: '30px',
    maxHeight: '100px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleMiniCart: {
    fontSize: '18px',
    lineHeight: '1.4',
    textTransform: 'uppercase',
    color: '#333',
  },
  btnCloseMiniCart: {
    height: '40px',
    textTransform: 'uppercase',
    border: 'none',
    borderRadius: '20px',
    color: '#333',
    backgroundColor: 'transparent',
    '&:hover': {
      color: '#717fe0',
    },
  },
  headerCartContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  miniCartItems: {
    overflowX: 'hidden',
    overflowY: 'auto',
    height: '69vh',
    '&::-webkit-scrollbar': {
      width: '0.5rem',
    },
    '&::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.3)',
      backgroundColor: 'white',
      borderRadius: '10px',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '10px',
      backgroundColor: '#999',
    },
  },
  miniCartItem: {
    display: 'flex',
    flexDirection: 'row',
    margin: '0 0 10px 0',
    borderBottom: '0.5px solid #888',
  },
  imgCart: {
    width: '60px',
    height: '60px',
    objectFit: 'cover',
  },
  infor: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '5px 10px',
    overflow: 'hidden',
    '& p': {
      padding: '0',
      margin: '0',
      color: '#999',
      fontSize: '0.9rem',
      cursor: 'pointer',
      wordWrap: 'break-word',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      '-webkit-box-orient': 'vertical',
      '-webkit-line-clamp': '2',
      display: '-webkit-box',
      '&:hover': {
        color: '#333',
      },
    },
    '& span ': {
      color: '#333',
      fontSize: '0.9rem',
    },
  },
  headerCartHandle: {
    height: '13vh',
    maxHeight: '100px',
    minHeight: '50px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  totalMiniCart: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& span': {
      maxHeight: '30px',
      overflow: 'hidden',
    },
  },
  link: {
    textDecoration: 'underline',
    '&:hover': {
      color: '#717fe0',
    },
  },
  btnCheckOut: {
    height: '40px',
    width: '60%',
    margin: '0 auto',
    textTransform: 'uppercase',
    fontSize: '1.1rem',
    border: 'none',
    borderRadius: '20px',
    color: '#fff',
    backgroundColor: '#333',
    '&:hover': {
      backgroundColor: '#717fe0',
    },
  },
}));
function MiniCart({ onCloseMiniCart }) {
  const classes = useStyles();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const total = useSelector(cartTotalSelector);

  const handleCloseMiniCart = () => {
    onCloseMiniCart();
  };

  const navigate = useNavigate();
  const handleProductClick = (item) => {
    navigate(`/${item.product.name}_i${item.product.id}`);
    window.scrollTo(0, 0);
  };
  return (
    <div className={classes.headerCart}>
      <div className={classes.headerCartTitle}>
        <span className={classes.titleMiniCart}>Your Cart</span>
        <button onClick={handleCloseMiniCart} className={classes.btnCloseMiniCart}>
          <CloseIcon />
        </button>
      </div>
      <div className={classes.headerCartContent}>
        <div className={classes.miniCartItems}>
          {cartItems.map((item, index) => (
            <div key={index} className={classes.miniCartItem}>
              <img
                className={classes.imgCart}
                src={`${
                  item.product.thumbnail
                    ? STATIC_HOST + item.product.thumbnail?.url
                    : IMG_URL
                }`}
                alt={`${item.product.name}`}
              ></img>
              <Box className={classes.infor}>
                <p className={classes.name} onClick={() => handleProductClick(item)}>
                  {item.product.name}
                </p>
                <span className={classes.price}>
                  {item.quantity} x {item.product.salePrice}
                </span>
              </Box>
            </div>
          ))}
        </div>
        <div className={classes.headerCartHandle}>
          <div className={classes.totalMiniCart}>
            <span>
              Total:{' '}
              {new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
              }).format(total)}
            </span>
            <a href="/cart" className={classes.link}>
              View Cart
            </a>
          </div>
          <button className={classes.btnCheckOut}>Check out</button>
        </div>
      </div>
    </div>
  );
}

export default MiniCart;
