import PropTypes from 'prop-types';
import { memo } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { IMG_URL, STATIC_HOST } from '../../../constants/index';
ProductThumnail.propTypes = {
  product: PropTypes.object,
};

function ProductThumnail({ product }) {
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
