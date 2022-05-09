import { Box, Container, Grid, Button, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
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
import ProductList from '../components/ProductList';
import Product from '../components/Product';
import { IMG_URL, LIMIT, STATIC_HOST } from '../../../constants';
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
  const params = useParams();
  const [loadingS, setLoadingS] = useState(true);
  const [productList, setProductList] = useState([]);
  const [loadingMore, setLoadingMore] = useState(true);

  const stringProduct = String(Object.values(params));
  const oldProductId = stringProduct.split('_i', 2).pop();
  const arrayProductId = oldProductId.split(',', 1);
  const productId = arrayProductId[0];

  const { product, loading, category } = useProductDetail(productId);
  console.log(product.description);
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
  }, [limit]);

  function innerProduct(product) {
    const linkProduct = `/${product.name}_i${product.id}`;
    const thumbnailUrl = product.thumbnail
      ? `${STATIC_HOST}${product.thumbnail?.url}`
      : IMG_URL;
    const nameproduct = product.name;
    const priceVN = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(product.originalPrice);
    const pricepercent = product.promotionPercent
      ? '<span class="makeStyles-pricePercent"> -' +
        product.promotionPercent +
        '% </span>'
      : '';
    return {
      __html:
        '<a href="' +
        linkProduct +
        '"><div class="css-1vl0eai" ><div class="css-MuiPaper-root"><div class="css-pd8"><div class="makeStyles-divimg"><img class="makeStyles-productImg" src=' +
        thumbnailUrl +
        '  width="100%" alt="' +
        nameproduct +
        '"/></div><div class="css-4g6ai3"><div class="makeStyles-divName"><p class="makeStyles-name">' +
        nameproduct +
        '</p></div><span class="makeStyles-price">' +
        priceVN +
        '</span>' +
        pricepercent +
        '</div></div></div></div></a>',
    };
  }
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
                {loadingMore ? `Loading` : `View More`}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default DetailPage;
