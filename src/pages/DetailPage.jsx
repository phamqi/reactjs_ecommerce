import { Box, Button, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useSnackbar } from 'notistack';
import { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes, useParams } from 'react-router-dom';

import productApi from '../api/productApi';
import Loading from '../components/Loading';
import { LIMIT } from '../constants';
import { addToCart } from '../features/Cart/cartSlice';
import AddToCartForm from '../features/Products/components/AddToCartForm';
import Description from '../features/Products/components/Description';
import ProductInfor from '../features/Products/components/ProductInfor';
import ProductMenu from '../features/Products/components/ProductMenu';
import ProductThumnail from '../features/Products/components/ProductThumnail';
import Related from '../features/Products/components/Related';
import Review from '../features/Products/components/Review';
import SkeletonProduct from '../features/Products/components/skeletonProduct';
import innerProduct from '../features/Products/hook/useInnerProduct';
import useProductDetail from '../features/Products/hook/useProductDetail';

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
      enqueueSnackbar('Add to cart successfully', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Please try again', { variant: 'error' });
    }
  };
  console.log('details rerender');

  const [page, setPage] = useState(1);
  useMemo(() => {
    console.log('re render in memo');
    const filter = { _limit: LIMIT, _page: page };
    (async () => {
      try {
        console.log('re render in async');
        const { data } = await productApi.innerProduct(filter);
        // const list = data.map((item) => productList.push(item))
        setProductList(productList.concat(data));
        setLoadingMore(false);
        console.log(page);
        console.log('b', productList);
      } catch (error) {
        console.log('fail to get product', error);
      }
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
                <Box className={classes.menu}>
                  <ProductMenu />
                  <Routes>
                    <Route exact path="/" element={<Description product={product} />} />
                    <Route exact path="reviews" element={<Review product={product} />} />
                  </Routes>
                </Box>
                <Box className={classes.productList}>
                  {loadingMore ? <SkeletonProduct length={LIMIT} /> : ''}
                  <Grid container>
                    {productList.map((product, index) => (
                      <div
                        key={index}
                        className="mmui-item"
                        dangerouslySetInnerHTML={innerProduct(product)}
                      />
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
