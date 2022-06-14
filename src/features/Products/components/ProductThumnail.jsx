import React from 'react';
import PropTypes from 'prop-types';
import { IMG_URL, STATIC_HOST } from '../../../constants/index';
import { makeStyles } from '@mui/styles';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { memo } from 'react';
import 'react-lazy-load-image-component/src/effects/blur.css';
const useStyles = makeStyles((theme) => ({}));
ProductThumnail.propTypes = {
  product: PropTypes.object,
};

function ProductThumnail({ product }) {
  const classes = useStyles();
  const thumbnailUrl = product.thumbnail
    ? `${STATIC_HOST}${product.thumbnail?.url}`
    : IMG_URL;
  return (
    <LazyLoadImage
      className="lazyload"
      src={thumbnailUrl}
      alt={product.name}
      width="100%"
      effect="blur"
    />
  );
}
export default memo(ProductThumnail);
