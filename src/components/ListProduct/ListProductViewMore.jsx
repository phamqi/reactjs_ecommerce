import { Box, Button, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';

import {
  CustomizeGrid,
  Product,
  QuickViewDialog,
  SkeletonProduct,
} from '../../components';
import { LIMIT } from '../../constants';

ListProductViewMore.propTypes = {};

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

function ListProductViewMore({ productList, loadingMore, handleLoadMore }) {
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
    <div>
      <Box className={classes.productList}>
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
        {loadingMore ? (
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
          ''
        )}
        <Button className="btnViewMore" onClick={() => handleLoadMore()}>
          {loadingMore ? `Loading...` : `View More`}
        </Button>
      </Box>
      <QuickViewDialog
        dialogState={dialogState}
        handleCloseQuickView={handleCloseQuickView}
        product={productQuickView}
      />
    </div>
  );
}
export default ListProductViewMore;
