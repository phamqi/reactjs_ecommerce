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
  root: {},
  divName: { minHeight: '45px' },
  name: {
    display: 'inline-block',
    wordWrap: 'break-word',
    whiteSpace: 'normal',
    overflow: 'hidden',
    display: '-webkit-box',
    textOverflow: 'ellipsis',
    lineHeight: '17px',
    fontSize: '.9rem',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': '2',
  },
  price: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontSize: '1rem',
    color: '#ee4d2d',
    fontWeight: '500',
  },
  productImg: {
    width: '100%',
    objectFit: 'cover',
  },
  divimg: {
    display: 'block',
    position: 'relative',
    overflow: 'hidden',
    '&:hover .btnBuy': {
      bottom: '20%',
    },
    '&:hover': {
      transition: 'transform 0.6s ease',
      transform: 'scale(1.1)',
    },
    '&  .btnBuy': {
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
        backgroundColor: 'black',
        border: 'none',
      },
    },
  },
  pricePercent: {
    marginLeft: '7px',
    fontSize: '0.77rem',
    border: '1px solid rgb(255, 66, 78)',
    borderRadius: '2px',
    backgroundColor: 'rgb(255, 240, 241)',
    color: 'rgb(255, 66, 78)',
  },
}));
Product.propTypes = {
  product: PropTypes.object,
};

function Product({ product }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const handleProductClick = () => {
    navigate(`/${product.name}_i${product.id}`);
    window.scrollTo(0, 0);
  };
  const thumbnailUrl = product.thumbnail
    ? `${STATIC_HOST}${product.thumbnail?.url}`
    : IMG_URL;
  return (
    <Box
      sx={{ position: 'relative', cursor: 'pointer' }}
      padding={1}
      onClick={handleProductClick}
    >
      <Paper elevation={2}>
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
          </Box>
          <Box sx={{ cursor: 'pointer' }}>
            <div className={classes.divName}>
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
      </Paper>
    </Box>
  );
}

export default Product;