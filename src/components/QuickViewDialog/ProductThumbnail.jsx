import PropTypes from 'prop-types';
import { memo, useEffect, useRef } from 'react';

import { IMG_URL, STATIC_HOST, IMG_PLACEHOLDER_URL } from '../../constants/index';
import { makeStyles } from '@mui/styles';

const useStyle = makeStyles((theme) => ({
  img: {
    width: '100%',
    objectFit: 'cover',
    aspectRatio: '1/1.4',
  },
}));
ProductThumbnail.propTypes = {
  product: PropTypes.object,
};

function ProductThumbnail({ product }) {
  const classes = useStyle();
  const imgProductUrl = product.thumbnail
    ? `${STATIC_HOST}${product.thumbnail?.url}`
    : IMG_URL;
  const ref = useRef();
  useEffect(() => {
    const lazyLoad = ref.current.getAttribute('data-set');
    try {
      if ('IntersectionObserver' in window) {
        const obServer = new IntersectionObserver(
          (entries) => {
            const entry = entries[0];
            if (entry.isIntersecting) {
              entry.target.src = lazyLoad;
              obServer.unobserve(entry.target);
            }
          },
          {
            threshold: 0.25,
          }
        );
        obServer.observe(ref.current);
      } else {
        const windowHeight = window.innerHeight;
        const imgLocation = ref.current.getBoundingClientRect().top - 200;
        window.addEventListener('scroll', function () {
          if (window.scrollY + windowHeight > imgLocation) {
            ref.current.setAttribute('src', lazyLoad);
          }
        });
      }
    } catch (error) {}
  }, []);
  return (
    <img
      ref={ref}
      className={classes.img}
      src={IMG_PLACEHOLDER_URL}
      data-set={imgProductUrl}
      alt={product.name}
    />
  );
}
export default memo(ProductThumbnail);
