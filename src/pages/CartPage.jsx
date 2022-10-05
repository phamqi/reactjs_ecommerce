import { Box, Button, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useMemo, useState } from 'react';

import productApi from '../api/productApi';
import { LIMIT } from '../constants';
import Cart from '../features/Cart/index';
import { SkeletonProduct } from '../features/Products';
import { innerProduct } from '../hook';
import NavigateComponent from '../components/NavigateComponent';

CartPage.propTypes = {};

const useStyles = makeStyles((theme) => ({
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
}));

function CartPage(props) {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [productList, setProductList] = useState([]);
  const [loadingMore, setLoadingMore] = useState(true);

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
    <Box className={classes.container}>
      <Cart />
      <h3>More to love</h3>
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
    </Box>
  );
}

export default CartPage;
