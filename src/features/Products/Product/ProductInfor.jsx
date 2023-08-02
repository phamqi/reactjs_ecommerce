import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
const useStyles = makeStyles((theme) => ({
  root: {
    padding: '0 1.5rem',

    '& h4': {
      display: '-webkit-box',
      overflow: 'hidden',
      fontSize: '1.4rem',
      wordWrap: 'break-word',
      lineHeight: '1.5',
      whiteSpace: 'normal',
      textOverflow: 'ellipsis',
      '-webkit-box-orient': 'vertical',
      ' -webkit-line-clamp': '3',
      marginBottom: '0',
      fontWeight: '500',
      maxHeight: '6.3rem',
      margin: '0',
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
  salePrice: {
    color: '#ee4d2d',
    overflow: 'hidden',
    fontSize: '1.6rem',
    fontWeight: '500',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  price: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  description: {
    display: '-webkit-box',
    overflow: 'hidden',
    fontSize: '0.9rem',
    wordWrap: 'break-word',
    lineHeight: '1.3',
    whiteSpace: 'normal',
    textOverflow: 'ellipsis',
    '-webkit-box-orient': 'vertical',
    ' -webkit-line-clamp': '3',
    marginBottom: '0',
    fontWeight: '400',
    minHeight: '3.51rem',
    margin: '0',
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
  return (
    <div className={classes.root}>
      <h4>{product.name}</h4>
      <div className={classes.price}>
        <span className={classes.salePrice}>{product.salePrice}</span>
        {product.promotionPercent ? (
          <div>
            <span className={classes.originalPrice}>{product.originalPrice}</span>
            <span className={classes.pricePercent}> -{product.promotionPercent}% </span>
          </div>
        ) : (
          ``
        )}
      </div>
      <span className={classes.description}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit veniam
        ipsam nesciunt. Perspiciatis tenetur illum molestiae quod quia vel nihil amet.
        Blanditiis modi vel est accusamus praesentium distinctio vitae recusandae!
      </span>
    </div>
  );
}

export default ProductThumnail;
