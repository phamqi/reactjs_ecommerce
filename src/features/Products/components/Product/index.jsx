import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import { IMG_URL, STATIC_HOST } from '../../../../constants/index';
import { useNavigate, useLocation } from 'react-router';
import { makeStyles } from '@mui/styles';
import { Paper, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import addToCart from '../../../Cart/cartSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    boxSizing: 'border-box',
    '&:hover divpaper': {
      boxShadow:
        '0px 3px 1px -2px rgb(0 0 0 / 60%), 0px 2px 2px 0px rgb(0 0 0 / 64%), 0px 1px 5px 0px rgb(0 0 0 / 62%)',
    },
  },
  divpaper: {
    backgroundColor: '#fff',
  },
  divName: { minHeight: '2.5rem' },
  name: {
    color: '#999',
    display: '-webkit-box',
    wordWrap: 'break-word',
    whiteSpace: 'normal',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    lineHeight: '14px',
    fontSize: '.9rem',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': '2',
  },
  price: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontSize: '1.05rem',
    color: '#666',
    fontWeight: '500',
    display: '-webkit-box',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': '2',
  },
  productImg: {
    width: '100%',
    objectFit: 'cover',
    display: 'block',
    overflow: 'hidden',
    position: 'relative',
  },
  divimg: {
    display: 'block',
    position: 'relative',
    overflow: 'hidden',
    '&:hover': {
      '& $btnBuy': {
        bottom: '10%',
      },
      '& $productImg': {
        transform: 'scale(1.2)',
        transition: 'all 0.7s ease-in-out',
      },
    },
  },
  btnBuy: {
    boxShadow: '1px 1px 1px grey',
    transition: 'all 0.4s',
    borderRadius: '20px',
    border: '1px solid white',
    bottom: '-50px',
    position: 'absolute',
    right: '0',
    left: '0',
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: 'transparent',
    width: '50%',
    overflow: 'hidden',
    color: 'white',
    padding: '4px 24px',
    '&:hover': {
      backgroundColor: 'white',
      color: 'black',
    },
  },
  pricePercent: {
    marginLeft: '7px',
    fontSize: '0.81rem',
    border: '1px solid rgb(255, 66, 78)',
    borderRadius: '2px',
    backgroundColor: 'rgb(255, 240, 241)',
    color: 'rgb(255, 66, 78)',
  },
}));
Product.propTypes = {
  product: PropTypes.object,
};

function Product({ product, onQuickView }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const handleQuickView = (product) => {
    onQuickView(product);
  };
  const handleProductClick = () => {
    navigate(`/${product.name}_i${product.id}`);
    window.scrollTo(0, 0);
  };
  const thumbnailUrl = product.thumbnail
    ? `${STATIC_HOST}${product.thumbnail?.url}`
    : IMG_URL;
  return (
    <Box className={classes.root} padding={1}>
      <Box className={classes.divpaper}>
        <Box padding={1}>
          <Box
            className={classes.divimg}
            sx={{ display: 'block', overflow: 'hidden', position: 'relative' }}
          >
            <img
              className={classes.productImg}
              src={thumbnailUrl}
              alt={product.name}
              width="100%"
            />
            <button onClick={() => handleQuickView(product)} className={classes.btnBuy}>
              Buy
            </button>
          </Box>
          <Box sx={{ cursor: 'pointer', paddingTop: '10px' }}>
            <div className={classes.divName} onClick={handleProductClick}>
              <p title={product.name} className={classes.name}>
                {product.name}
              </p>
            </div>
            <span className={classes.price}>
              {new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
              }).format(product.originalPrice)}
            </span>

            {product.promotionPercent ? (
              <span className={classes.pricePercent}> -{product.promotionPercent}% </span>
            ) : (
              ``
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Product;
