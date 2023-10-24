import { Box, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useSnackbar } from 'notistack';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, Route, Routes, useParams } from 'react-router-dom';

import productApi from '../api/productApi';
import {
  ListProductViewMore,
  ProductInfo,
  ProductThumbnail,
  QuickViewDialog,
} from '../components';
import AddToCartForm from '../components/form-control/addToCart';
import { IMG_URL, LIMIT, MESSAGEBOX, STATIC_HOST } from '../constants';
import { addToCart } from '../features/Cart/cartSlice';
import { Description, Related, Review } from '../features/Products';
import { useProductDetail } from '../hook';
import SkeletonPage from './Skeleton/SkeletionPage';

DetailPage.propTypes = {};

const useStyles = makeStyles((theme) => ({
  product: {
    backgroundColor: '#fff',
    maxWidth: '1200px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  productImg: {
    width: '100%',
    objectFit: 'cover',
    aspectRatio: '1/1.4',
    border: '1px solid #e6e6e6',
    boxSizing: 'border-box',
  },
  menu: {
    width: '100%',
    overflow: 'hidden',
    backgroundColor: '#fff',
    marginTop: '60px',
    border: '1px solid #e6e6e6',
  },
  container: {
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: '#fff',
  },
  productMenu: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    '& a': {
      margin: '0.5rem 1rem',
      backgroundColor: 'transparent',
      padding: '0.5rem',
      paddingBottom: '0',
      color: '#888',
      '&.active': {
        color: '#333',
        borderBottom: '1px solid #797979',
      },
    },
  },
  productList: {
    marginTop: '60px',
    backgroundColor: '#fff',
    paddingTop: ' 30px',
  },
  related: {
    backgroundColor: '#fff',
    paddingTop: ' 30px',
    marginTop: '60px',
  },
  titleText: {
    margin: 0,
    textTransform: 'uppercase',
    textAlign: 'center',
    lineHeight: '1.2',
    fontSize: '1.3rem',
    color: '#666',
  },
}));

function DetailPage(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const params = useParams();
  const [productList, setProductList] = useState([]);
  const [loadingMore, setLoadingMore] = useState(true);

  const stringProduct = String(Object.values(params));
  const oldProductId = stringProduct.split('_i', 2).pop();
  const arrayProductId = oldProductId.split(',', 1);
  const productId = arrayProductId[0];

  const { enqueueSnackbar } = useSnackbar();

  const { product, loading, category } = useProductDetail(productId);
  const handleAddToCartSubmit = async (values) => {
    try {
      const action = addToCart({
        id: product.id,
        product: product,
        quantity: values.quantity,
      });
      await dispatch(action);
      enqueueSnackbar(`${MESSAGEBOX.add}`, { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(`${MESSAGEBOX.error}`, { variant: 'error' });
    }
  };

  const [page, setPage] = useState(1);
  useMemo(() => {
    const filter = { _limit: LIMIT, _page: page };
    (async () => {
      try {
        const { data } = await productApi.innerProduct(filter);
        setProductList(productList.concat(data));
        setLoadingMore(false);
      } catch (error) {}
    })();
  }, [page]);

  const handleLoadMore = () => {
    setLoadingMore(true);
    setPage(page + 1);
  };

  const [isReview, setIsReview] = useState(false);
  useEffect(() => {
    const arrPathname = window.location.pathname.split('/');
    if (arrPathname[arrPathname.length - 1] == 'reviews') {
      setIsReview(true);
    } else {
      setIsReview(false);
    }
  }, [window.location.pathname]);
  return (
    <div className="detailsPage">
      <Box sx={{ overflow: 'hidden' }}>
        <Box className={classes.container}>
          <Box className={classes.product} sx={{ padding: { xs: '0', sm: '24px' } }}>
            <Grid container>
              <Grid item xs={12} sm={6} md={5} lg={5}>
                <img
                  className={classes.productImg}
                  src={
                    product?.thumbnail?.url
                      ? `${STATIC_HOST}${product?.thumbnail?.url}`
                      : IMG_URL
                  }
                  alt={product.name}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={7} lg={7}>
                <ProductInfo product={product} loading={loading} />
                {product && <AddToCartForm onSubmit={handleAddToCartSubmit} />}
              </Grid>
              <Box className={classes.menu}>
                <Box>
                  <Box className={classes.productMenu}>
                    <Link className={!isReview ? 'active' : ''} to="" id="description">
                      Description
                    </Link>
                    <Link className={isReview ? 'active' : ''} to="reviews">
                      Review
                    </Link>
                  </Box>
                </Box>
                {product && (
                  <Routes>
                    <Route exact path="/" element={<Description product={product} />} />
                    <Route path="reviews" element={<Review product={product} />} />
                  </Routes>
                )}
              </Box>
            </Grid>
          </Box>
        </Box>
        <Box>
          <Box className={classes.related}>
            <h3 className={classes.titleText}>related product</h3>
            <Related category={category} />
          </Box>
          <Box className={classes.productList}>
            <Box sx={{ maxWidth: '1200px', marginLeft: 'auto', marginRight: 'auto' }}>
              <h3 className={classes.titleText}>YOU MAY ALSO LIKE</h3>
              <ListProductViewMore
                loadingMore={loadingMore}
                productList={productList}
                handleLoadMore={handleLoadMore}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default DetailPage;
