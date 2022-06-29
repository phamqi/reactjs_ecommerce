import { Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import { IMG_URL, STATIC_HOST } from '../../../constants/index';

const useStyles = makeStyles((theme) => ({
  root: {},
  divName: { minHeight: '45px' },
  name: {
    color: '#999',
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
  divImg: {
    display: 'block',
    position: 'relative',
    overflow: 'hidden',
    '&:hover .btnBuy': {
      bottom: '20%',
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
  productLink: {
    width: '20%',
    padding: '8px',
    position: 'relative',
    cursor: 'pointer',
  },
}));
Product.propTypes = {
  product: PropTypes.object,
};

function Product({ product }) {
  const classes = useStyles();
  //   const navigate = useNavigate();
  //   const handleProductClick = () => {
  //     navigate(`/${product.name}_i${product.id}`);
  //   };
  const thumbnailUrl = product.thumbnail
    ? `${STATIC_HOST}${product.thumbnail?.url}`
    : IMG_URL;
  return (
    <a className={classes.productLink} href={`products/${product.name}_i${product.id}`}>
      <Paper elevation={2}>
        <Box padding={1}>
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
    </a>
  );
}

export default Product;
