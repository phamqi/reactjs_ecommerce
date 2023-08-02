import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';

import { IMG_URL, STATIC_HOST, BTN_QUICK_VIEW_TEXT } from '../../../constants/index';
import NavigateComponent from '../../../components/NavigateComponent';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    boxSizing: 'border-box',
    padding: 'min(15px , max(calc(( 100vw - 420px)*9999), 0px))',
    paddingBottom: '35px',
    '&:hover': {},
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
    lineHeight: '1.3',
    fontSize: '.875rem',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': '2',
  },
  price: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontSize: '.9rem',
    color: '#666',
    fontWeight: '500',
    display: '-webkit-box',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': '2',
  },
  productImg: {
    width: 'min(100% , max( calc(420px - 100vw)*9999, 240px))',
    aspectRatio: '1/1.4',
    objectFit: 'cover',
    display: 'block',
    overflow: 'hidden',
    position: 'relative',
  },
  divImg: {
    display: 'block',
    position: 'relative',
    overflow: 'hidden',
    '&:hover': {
      '& $btnView': {
        bottom: '10%',
      },
      '& $productImg': {
        transform: 'scale(1.2)',
        transition: 'all 0.7s ease-in-out',
      },
    },
  },
  btnView: {
    fontSize: '1rem',
    transition: 'all 0.4s',
    borderRadius: '20px',
    border: '1px solid #fff',
    bottom: '-50px',
    position: 'absolute',
    right: '0',
    left: '0',
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: '#fff',
    width: '50%',
    overflow: 'hidden',
    color: '#999',
    padding: '4px 0',
    '&:hover': {
      backgroundColor: '#717fe0',
      color: '#fff',
      border: '1px solid #717fe0',
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

function Product({ product, onQuickView, productPage = false }) {
  const classes = useStyles();
  const handleQuickView = (product) => {
    onQuickView(product);
  };
  const checkPage = (product, productPage) => {
    if (productPage) {
      return `${product.name}_i${product.id}`;
    } else {
      return `products/${product.name}_i${product.id}`;
    }
  };
  const href = checkPage(product, productPage);
  const thumbnailUrl = product.thumbnail
    ? `${STATIC_HOST}${product.thumbnail?.url}`
    : IMG_URL;
  return (
    <Box className={classes.root}>
      <Box>
        <Box
          className={classes.divImg}
          sx={{ display: 'block', overflow: 'hidden', position: 'relative' }}
        >
          <img className={classes.productImg} src={thumbnailUrl} alt={product.name} />
          <button onClick={() => handleQuickView(product)} className={classes.btnView}>
            {BTN_QUICK_VIEW_TEXT}
          </button>
        </Box>
        <Box
          sx={{
            cursor: 'pointer',
            paddingTop: '10px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div className={classes.divName}>
            <NavigateComponent href={href} title={product.name} className={classes.name}>
              {product.name}
            </NavigateComponent>
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
  );
}

export default Product;
