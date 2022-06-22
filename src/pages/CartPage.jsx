import { Box, Button, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useMemo, useState } from 'react';
import productApi from '../api/productApi';
import { LIMIT } from '../constants';
import Cart from '../features/Cart/index';
import SkeletonProduct from '../features/Products/components/skeletonProduct';
import innerProduct from '../features/Products/hook/useInnerProduct';

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
    <>
      <Cart />
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
    </>
  );
}

export default CartPage;
