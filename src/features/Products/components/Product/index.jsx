import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import { IMG_URL, STATIC_HOST } from '../../../../constants/index';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    boxSizing: 'border-box',
    padding: '15px',
    paddingBottom: '35px',
    '&:hover': {
      boxShadow:
        '3px 1px 1px 1px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
    },
  },
  divName: { minHeight: '2.5rem' },
  name: {
    color: '#999',
    display: '-webkit-box',
    wordWrap: 'break-word',
    whiteSpace: 'normal',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    lineHeight: '1.3',
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
    padding: '4px 0',
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
  const handleQuickView = (product) => {
    onQuickView(product);
  };

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
          <img
            className={classes.productImg}
            src={thumbnailUrl}
            alt={product.name}
            width="100%"
          />
          <button onClick={() => handleQuickView(product)} className={classes.btnView}>
            View
          </button>
        </Box>
        <Box sx={{ cursor: 'pointer', paddingTop: '10px' }}>
          <div className={classes.divName}>
            <a
              href={`products/${product.name}_i${product.id}`}
              title={product.name}
              className={classes.name}
            >
              {product.name}
            </a>
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
