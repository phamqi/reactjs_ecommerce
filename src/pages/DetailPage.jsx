import { Box, Button, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useSnackbar } from 'notistack';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, Route, Routes, useParams } from 'react-router-dom';

import productApi from '../api/productApi';
import { CustomizeGrid, Product } from '../components';
import QuickViewDialog from '../components/QuickViewDialog';
import AddToCartForm from '../components/form-control/addToCart';
import { LIMIT, MESSAGEBOX } from '../constants';
import { addToCart } from '../features/Cart/cartSlice';
import {
  Description,
  ProductInfo,
  ProductThumbnail,
  Related,
  Review,
  SkeletonProduct,
} from '../features/Products';
import { useProductDetail } from '../hook';
import SkeletonPage from './Skeleton/SkeletionPage';

DetailPage.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: { backgroundColor: '#fff' },
  menu: {
    overflow: 'hidden',
    backgroundColor: '#fff',
    marginTop: '40px',
  },
  container: {
    maxWidth: '1200px',
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
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
      '&.active': {
        backgroundColor: '#717fe0',
        color: '#fff',
        borderRadius: '8px',
      },
    },
  },
  productList: {
    marginTop: '1.5rem',
    backgroundColor: '#fff',
    padding: '1.5rem 0',
    '&> button.btnViewMore': {
      marginTop: '1rem',
      marginLeft: '50%',
      transform: 'translateX(-50%)',
      textTransform: 'none',
      border: '1px solid #717fe0',
      color: '#717fe0',
      '&:hover': {
        backgroundColor: '#717fe0',
        color: '#fff',
      },
    },
  },
  related: {
    backgroundColor: '#fff',
    padding: ' 10px 0 1px',
    margin: '40px 0 0 0',
  },
  productBeInserted: {},
}));

function DetailPage(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const params = useParams();
  const [productList, setProductList] = useState([]);
  const [loadingMore, setLoadingMore] = useState(true);

  console.log('detail rerender');
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
  const [dialogState, setDialogState] = useState(false);
  const [productQuickView, setProductQuickView] = useState();
  const onQuickView = (product) => {
    setProductQuickView(product);
    setDialogState(true);
  };
  const handleCloseQuickView = () => {
    setDialogState(false);
  };

  const [isReview, setIsReview] = useState(false);
  useEffect(() => {
    const arrPathname = window.location.pathname.split('/');
    console.log(typeof arrPathname[arrPathname.length - 1]);
    if (arrPathname[arrPathname.length - 1] == 'reviews') {
      setIsReview(true);
      console.log(arrPathname[arrPathname.length - 1]);
    } else {
      setIsReview(false);
      console.log(arrPathname[arrPathname.length - 1]);
    }
  }, [window.location.pathname]);
  return (
    <div className="detailsPage">
      <Box sx={{ overflow: 'hidden' }}>
        <Box className={classes.container}>
          <Box>
            {!loading ? (
              <div>
                <Box className={classes.root} sx={{ padding: { xs: '0', sm: '24px' } }}>
                  <Grid container>
                    <Grid item xs={12} sm={6} md={5} lg={5}>
                      <ProductThumbnail product={product} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={7} lg={7}>
                      <ProductInfo product={product} />
                      <AddToCartForm onSubmit={handleAddToCartSubmit} />
                    </Grid>
                  </Grid>
                </Box>
                <Box className={classes.related}>
                  <Related category={category} />
                </Box>
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
                  <Routes>
                    <Route exact path="/" element={<Description product={product} />} />
                    <Route path="reviews" element={<Review product={product} />} />
                  </Routes>
                </Box>
              </div>
            ) : (
              <div>
                <SkeletonPage />
              </div>
            )}
            <Box className={classes.productList}>
              {loadingMore ? <SkeletonProduct length={LIMIT} /> : ''}
              <Grid container p={2}>
                {productList.map((product, index) => (
                  <CustomizeGrid
                    key={index}
                    ss={12}
                    xs={6}
                    sm={4}
                    md={3}
                    lg={3}
                    sx={{ width: '100%' }}
                  >
                    <Product product={product} onQuickView={onQuickView} />
                  </CustomizeGrid>
                ))}
              </Grid>
              <Button className="btnViewMore" onClick={() => handleLoadMore()}>
                {loadingMore ? `Loading...` : `View More`}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <QuickViewDialog
        dialogState={dialogState}
        handleCloseQuickView={handleCloseQuickView}
        product={productQuickView}
      />
    </div>
  );
}

export default DetailPage;
