import { Box, Grid } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { makeStyles } from '@mui/styles';
import { memo, useState } from 'react';

import {
  CustomizeGrid,
  Product,
  QuickViewDialog,
  SkeletonProduct,
} from '../../components';
import { LIMIT } from '../../constants';

ListProductPagination.propTypes = {};

const useStyles = makeStyles((theme) => ({
  pagination: {
    '& > ul > li > .MuiPaginationItem-root.Mui-selected': {
      backgroundColor: '#717fe0',
    },
  },
}));
function ListProductPagination({ productList, loading, pagination, handlePageChange }) {
  const classes = useStyles();
  const [dialogState, setDialogState] = useState(false);
  const [productQuickView, setProductQuickView] = useState();
  const onQuickView = (product) => {
    setProductQuickView(product);
    setDialogState(true);
  };
  const handleCloseQuickView = () => {
    setDialogState(false);
  };
  return (
    <div id="products_list">
      {loading ? (
        <Grid container p={2}>
          {Array.from(Array(LIMIT).keys()).map((index) => (
            <CustomizeGrid
              key={index}
              sl={12}
              xs={6}
              sm={6}
              md={4}
              lg={3}
              xl={3}
              sx={{ width: '100%' }}
            >
              <SkeletonProduct />
            </CustomizeGrid>
          ))}
        </Grid>
      ) : (
        <Grid container p={2}>
          {productList.map((product, index) => (
            <CustomizeGrid
              key={index}
              sl={12}
              xs={6}
              sm={6}
              md={4}
              lg={3}
              xl={3}
              sx={{ width: '100%' }}
            >
              <Product product={product} onQuickView={onQuickView} />
            </CustomizeGrid>
          ))}
        </Grid>
      )}
      <Box sx={{ display: 'flex', justifyContent: 'center', padding: '13px 0' }}>
        <a href="#products_list">
          <Pagination
            siblingCount={1}
            className={classes.pagination}
            count={Math.ceil(pagination.total / pagination.limit)}
            page={pagination.page}
            onChange={handlePageChange}
          ></Pagination>
        </a>
      </Box>
      <QuickViewDialog
        dialogState={dialogState}
        product={productQuickView}
        handleCloseQuickView={handleCloseQuickView}
      />
    </div>
  );
}

export default memo(ListProductPagination);
