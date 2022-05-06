import { Box, Container, Grid, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import Loading from '../../../components/Loading';
import Header from '../../Header';
import AddToCartForm from '../components/AddToCartForm';
import Description from '../components/Decription';
import ProductInfor from '../components/ProductInfor';
import ProductMenu from '../components/ProductMenu';
import ProductThumnail from '../components/ProductThumnail';
import Review from '../components/Review';
import useProductDetail from '../hook/useProductDetail';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../Cart/cartSlice';
import Related from '../components/Related';
import { makeStyles } from '@mui/styles';
import productApi from '../../../api/productApi';
import SkeletonProduct from '../components/skeletonProduct';
import ProductListLink from '../components/ProductListLink';
import ProductList from '../components/ProductList';
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
      marginLeft: '50%',
      transform: 'translateX(-50%)',
      textTransform: 'none',
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
  let params = useParams();
  const [loadingS, setLoadingS] = useState(true);
  const [productList, setProductList] = useState([]);
  const stringProduct = String(Object.values(params));
  const oldProductId = stringProduct.split('_i', 2).pop();
  const arrayProductId = oldProductId.split(',', 1);
  const productId = arrayProductId[0];
  const { product, loading, category } = useProductDetail(productId);
  console.log('category', category);
  const handleAddToCartSubmit = async (values) => {
    try {
      const action = addToCart({
        id: product.id,
        product: product,
        quantity: values.quantity,
      });
      await dispatch(action);
    } catch (error) {
      console.log('loi o details', error);
    }
  };
  const [limit, setLimit] = useState(12);
  const _limit = { _limit: limit };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await productApi.getAll(_limit);
        setProductList(data);
      } catch (error) {
        console.log('fail to get product', error);
      }
      setLoadingS(false);
    })();
  }, [limit]);
  return (
    <div className="DetailsPage">
      <Box sx={{ overflow: 'hidden' }}>
        <Header />
        <Box className={classes.container}>
          <Box>
            {loading && <Loading />}
            <Box className={classes.root} sx={{ padding: { xs: '0', sm: '1.7rem ' } }}>
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
              {loadingS ? (
                <SkeletonProduct length={limit} />
              ) : (
                <ProductList data={productList} />
              )}
              <Button
                className="btnViewMore"
                onClick={() => {
                  setLimit(limit + 12);
                  setLoadingS(true);
                }}
              >
                {loadingS ? `Loading` : `View More`}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default DetailPage;
