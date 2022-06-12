import { Box, Button, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import useProductDetail from '../features/Products/hook/useProductDetail';
import { addToCart } from '../features/Cart/cartSlice';
import { LIMIT } from '../constants';
import productApi from '../api/productApi';
import Loading from '../components/Loading';
import ProductThumnail from '../features/Products/components/ProductThumnail';
import ProductInfor from '../features/Products/components/ProductInfor';
import AddToCartForm from '../features/Products/components/AddToCartForm';
import { Description } from '@mui/icons-material';
import SkeletonProduct from '../features/Products/components/skeletonProduct';
import Review from '../features/Products/components/Review';
import Related from '../features/Products/components/Related';
import ProductMenu from '../features/Products/components/ProductMenu';
import innerProduct from '../features/Products/hook/useInnerProduct';

DetailPage.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: { backgroundColor: 'white' },
  menu: {
    overflow: 'hidden',
    backgroundColor: 'white',
    marginTop: '1.5rem',
  },
  container: {
    maxWidth: '1200px',
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  productList: {
    marginTop: '1.5rem',
    backgroundColor: 'white',
    padding: '1.5rem 0',
    '&> button.btnViewMore': {
      marginTop: '1rem',
      marginLeft: '50%',
      transform: 'translateX(-50%)',
      textTransform: 'none',
      border: '1px solid blue',
      '&:hover': {
        backgroundColor: 'rgb(13, 92, 182)',
        color: 'white',
      },
    },
  },
  related: {
    backgroundColor: 'white',
    paddingBottom: '1px',
  },
}));

function DetailPage(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const params = useParams();
  const [loadingS, setLoadingS] = useState(true);
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
      enqueueSnackbar('Add to cart successfully', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Please try again', { variant: 'error' });
    }
  };
  const [limit, setLimit] = useState(LIMIT);
  const _limit = { _limit: limit };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await productApi.getAll(_limit);
        setProductList(data);
        setLoadingMore(false);
      } catch (error) {
        console.log('fail to get product', error);
      }
      setLoadingS(false);
    })();
  }, [_limit]);

  return (
    <div className="detailsPage">
      <Box sx={{ overflow: 'hidden' }}>
        <Box className={classes.container}>
          <Box>
            {loading ? (
              <div>
                ABC
                <Loading />
              </div>
            ) : (
              <div>
                <Box
                  className={classes.root}
                  sx={{ padding: { xs: '0', sm: '1.7rem ' } }}
                >
                  <Grid container>
                    <Grid item xs={12} sm={6} md={5} lg={5}>
                      <ProductThumnail product={product} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={7} lg={7}>
                      <ProductInfor product={product} />
                      <AddToCartForm onSubmit={handleAddToCartSubmit} />
                    </Grid>
                  </Grid>
                </Box>
                <Box className={classes.related}>
                  <Related category={category} />
                </Box>
                <Box className={classes.menu} sx={{ overflow: 'hidden' }}>
                  <ProductMenu />
                  <Routes>
                    <Route exact path="/" element={<Description product={product} />} />
                    <Route exact path="reviews" element={<Review product={product} />} />
                  </Routes>
                </Box>
                <Box className={classes.productList}>
                  {loadingS ? <SkeletonProduct length={LIMIT} /> : ''}
                  <Grid container>
                    {productList.map((product) => (
                      <div
                        key={product.id}
                        className="mmui-item"
                        dangerouslySetInnerHTML={innerProduct(product)}
                      />
                    ))}
                  </Grid>
                  <Button
                    className="btnViewMore"
                    onClick={() => {
                      setLoadingMore(true);
                      setLimit(limit + 12);
                    }}
                  >
                    {loadingMore ? `Loading...` : `View More`}
                  </Button>
                </Box>
              </div>
            )}
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default DetailPage;
