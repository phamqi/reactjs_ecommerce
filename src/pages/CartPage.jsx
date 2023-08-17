import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useMemo, useState } from 'react';

import productApi from '../api/productApi';
import { ListProductViewMore } from '../components';
import { LIMIT } from '../constants';
import Cart from '../features/Cart/index';

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
        <ListProductViewMore
          loadingMore={loadingMore}
          productList={productList}
          handleLoadMore={handleLoadMore}
        />
      </Box>
    </Box>
  );
}

export default CartPage;
