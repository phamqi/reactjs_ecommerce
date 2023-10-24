import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';

import { IMG_URL, STATIC_HOST, BTN_QUICK_VIEW_TEXT } from '../../constants';
import { CreateNavigate } from '../../components';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    boxSizing: 'border-box',
    padding: 'min(15px , max(calc(( 100vw - 376px)*9999), 0px))',
    paddingBottom: '35px',
  },
  divName: {
    minHeight: '2.5rem',
    '&:hover': {
      '& $name': {
        color: '#717fe0',
      },
    },
  },
  name: {
    color: '#999',
    display: '-webkit-box',
    wordWrap: 'break-word',
    whiteSpace: 'normal',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textTransform: 'capitalize',
    lineHeight: '1.3',
    fontSize: '.875rem',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': '2',
  },
  price: {
    maxWidth: '90%',
    overflow: 'hidden',
    fontSize: '.9rem',
    color: '#666',
    fontWeight: '500',
  },
  pricePercent: {
    width: 'fit-content',
    marginLeft: '7px',
    fontSize: '0.81rem',
    border: '1px solid rgb(255, 66, 78)',
    borderRadius: '2px',
    backgroundColor: 'rgb(255, 240, 241)',
    color: 'rgb(255, 66, 78)',
  },
  productImg: {
    width: '100%',
    aspectRatio: '1/1.4',
    objectFit: 'cover',
    display: 'block',
    overflow: 'hidden',
    position: 'relative',
    transform: 'scale(1)',
  },
  imgBox: {
    display: 'block',
    position: 'relative',
    overflow: 'hidden',
    '&:hover': {
      '& $btnQuickView': {
        display: 'block',
        transform: 'translateY(-300%)',
        transition: 'all 0.4s ease-in-out',
      },
      '& $productImg': {
        transform: 'scale(1.2)',
        transition: 'all 0.7s ease-in-out',
      },
    },
  },
  btnQuickView: {
    display: 'none',
    fontSize: '1rem',
    transition: 'all 0.4s',
    borderRadius: '20px',
    border: '1px solid #bbb9b9',
    bottom: '-50px',
    position: 'absolute',
    right: '0',
    left: '0',
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: '#fff',
    width: 'fit-content',
    overflow: 'hidden',
    color: '#999',
    padding: '4px 8px',
    '&:hover': {
      backgroundColor: '#717fe0',
      color: '#fff',
      border: '1px solid #717fe0',
    },
  },
}));
Product.propTypes = {
  product: PropTypes.object,
};

function Product({ product, onQuickView, isQuickView = true }) {
  const classes = useStyles();
  const handleQuickView = (e) => {
    e.stopPropagation();
    onQuickView(product);
  };
  const createHref = (product) => {
    if (product && product.name && product.id) {
      const productNameNoSpaces = product.name.replaceAll(' ', '_');
      return `/products/${productNameNoSpaces}_i${product.id}`;
    } else {
      return `/error`;
    }
  };
  const href = createHref(product);
  const thumbnailUrl = product.thumbnail
    ? `${STATIC_HOST}${product.thumbnail?.url}`
    : IMG_URL;
  return (
    <Box className={classes.root}>
      <Box className={classes.imgBox}>
        <img
          loading="lazy"
          className={classes.productImg}
          src={thumbnailUrl}
          alt={product.name}
        />
        {product && isQuickView ? (
          <button onClick={(e) => handleQuickView(e)} className={classes.btnQuickView}>
            {BTN_QUICK_VIEW_TEXT}
          </button>
        ) : (
          ''
        )}
      </Box>
      <Box
        sx={{
          cursor: 'pointer',
          paddingTop: '10px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <CreateNavigate href={href}>
          <Box className={classes.divName}>
            <p className={classes.name}>{product ? product.name : 'Loading...'}</p>
          </Box>
        </CreateNavigate>

        <Box>
          {product ? (
            product.promotionPercent ? (
              <>
                <span className={classes.price}>
                  {new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  }).format(product.salePrice)}
                </span>
                <span className={classes.pricePercent}>-{product.promotionPercent}%</span>
              </>
            ) : (
              <span className={classes.price}>
                {new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                }).format(product.originalPrice)}
              </span>
            )
          ) : (
            <span className={classes.price}>Loading...</span>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default Product;
