import { Box, Button, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useSnackbar } from 'notistack';
import { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes, useParams } from 'react-router-dom';

import productApi from '../api/productApi';
import AddToCartForm from '../components/form-control/addToCart';
import { LIMIT, MESSAGEBOX } from '../constants';
import { addToCart } from '../features/Cart/cartSlice';
import {
  Description,
  ProductInfor,
  ProductMenu,
  ProductThumnail,
  Related,
  Review,
  SkeletonProduct,
} from '../features/Products';
import { innerProduct, useProductDetail } from '../hook';
import SkeletonPage from './Skeleton/SkeletionPage';
import NavigateComponent from '../components/NavigateComponent';

DetailPage.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: { backgroundColor: 'white' },
  menu: {
    overflow: 'hidden',
    backgroundColor: 'white',
    marginTop: '40px',
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
    padding: ' 10px 0 1px',
    margin: '40px 0 0 0',
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
  return (
    <div className="detailsPage">
      <Box sx={{ overflow: 'hidden' }}>
        <Box className={classes.container}>
          <Box>
            {loading ? (
              <div>
                <SkeletonPage />
              </div>
            ) : (
              <div>
                <Box className={classes.root} sx={{ padding: { xs: '0', sm: '24px' } }}>
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
                <Box className={classes.menu}>
                  <ProductMenu />
                  <Routes>
                    <Route path="/" element={<Description product={product} />} />
                    <Route path="reviews" element={<Review product={product} />} />
                  </Routes>
                </Box>
                <Box className={classes.productList}>
                  {loadingMore ? <SkeletonProduct length={LIMIT} /> : ''}
                  <Grid container>
                    {productList.map((product, index) => (
                      <NavigateComponent
                        key={index}
                        href={`/products/${product.name}_i${product.id}`}
                        title={product.name}
                        className="mmui-item"
                      >
                        <div dangerouslySetInnerHTML={innerProduct(product)} />
                      </NavigateComponent>
                    ))}
                  </Grid>
                  <Button className="btnViewMore" onClick={() => handleLoadMore()}>
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
