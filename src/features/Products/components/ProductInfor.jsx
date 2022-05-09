import React from 'react';
import PropTypes from 'prop-types';
import { memo } from 'react';
import { IMG_URL, STATIC_HOST } from '../../../constants/index';
import { makeStyles } from '@mui/styles';
const useStyles = makeStyles((theme) => ({
  root: {
    padding: '0 1.5rem',

    '& h3': {
      display: '-webkit-box',
      overflow: 'hidden',
      fontSize: '1.5rem',
      wordWrap: 'break-word',
      lineHeight: '1.7rem',
      whiteSpace: 'normal',
      textOverflow: 'ellipsis',
      '-webkit-box-orient': 'vertical',
      ' -webkit-line-clamp': '2',
      marginBottom: '0',
      fontWeight: '400',
      minHeight: '54px',
    },
  },
  pricePercent: {
    marginLeft: '7px',
    fontSize: '0.9rem',
    border: '1px solid rgb(255, 66, 78)',
    borderRadius: '2px',
    backgroundColor: 'rgb(255, 240, 241)',
    color: 'rgb(255, 66, 78)',
  },
  price: {
    color: '#ee4d2d',
    overflow: 'hidden',
    fontSize: '1.6rem',
    fontWeight: '500',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  divPrice: {
    padding: '1rem 1.3rem',
    display: 'flex',
    alignItems: 'flex-end',
  },
  originalPrice: {
    textDecoration: 'line-through',
    color: 'rgb(128, 128, 137)',
    marginLeft: '0.5rem',
  },
}));
ProductThumnail.propTypes = {
  product: PropTypes.object,
};

function ProductThumnail({ product }) {
  const classes = useStyles();
  console.log('product infor rerender');
  return (
    <div className={classes.root}>
      <h3>{product.name}</h3>
      <div className={classes.divPrice}>
        <span className={classes.price}>{product.salePrice}</span>
        {product.promotionPercent ? (
          <div>
            <span className={classes.originalPrice}>{product.originalPrice}</span>
            <span className={classes.pricePercent}> -{product.promotionPercent}% </span>
          </div>
        ) : (
          ``
        )}
      </div>
    </div>
  );
}

export default memo(ProductThumnail);
