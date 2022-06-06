import { Box, Dialog, DialogContent, Grid, Paper } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { makeStyles } from '@mui/styles';
import queryString from 'query-string';
import React, { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';

import Slide from '../../Slide';
import Banner from '../../Banner';
import { dataSlides } from '../../Slide/dataSlides';
import ProductFilters from '../components/Filters';
import ProductSort from '../components/ProductSort';
import SkeletonProduct from '../components/skeletonProduct';
import useProductList from '../hook/useProductList';
import Product from '../components/Product';
import ProductThumnail from '../components/ProductThumnail';
import ProductInfor from '../components/ProductInfor';
import AddToCartForm from '../components/AddToCartForm';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../Cart/cartSlice';
MainPage.propTypes = {};
const theme = createTheme({
  breakpoints: {
    keys: ['ss', 'xs', 'sm', 'md', 'lg', 'xl'],
    values: {
      ss: 0,
      xs: 420,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1500,
    },
  },
});
const GridWithSS = ({ ss, ...other }) => {
  const ssClass = `MuiGrid-grid-ss-${ss}`;
  return <Grid className={ssClass} {...other} />;
};
const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    top: '50%',
    right: 10,
    zIndex: 1,
  },
  left: {
    width: '250px',
  },
  right: {
    flex: '1 1 0',
  },
  'div.MuiFormControl-root': {
    margin: 0,
  },
  container: {
    maxWidth: '1200px',
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  dialogQuickView: {
    display: 'block',
    '& .MuiDialog-container ': {
      position: 'relative',
      justifyContent: 'center',
      '& .MuiPaper-root': {
        width: 'max(60vw, min(100vw, (calc((600px - 100vw)*99999))))',
        margin: '0',
        height: 'max(100%, min(100vw, (calc((600px - 100vw)*99999))))',
        border: 'none',
        borderRadius: '8px',
        maxWidth: '610px',
        '& .MuiDialogContent-root ': {
          overFlow: 'hidden',
          padding: '20px',
          overflowY: 'hidden',
        },
      },
    },
  },
  btnCloseQuickView: {
    textTransform: 'uppercase',
    border: 'none',
    borderRadius: '20px',
    color: '#333',
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    '&:hover': {
      color: '#717fe0',
    },
    '& svg': {
      fontSize: '2rem',
    },
  },
}));
function MainPage() {
  const location = useLocation();
  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);
    return {
      ...params,
      _page: Number.parseInt(params._page) || 1,
      _limit: Number.parseInt(params._limit) || 12,
      _sort: params._sort || 'created_at:ASC',
      isFreeShip: params.isFreeShip === 'true',
      isPromotion: params.isPromotion === 'true',
    };
  }, [location.search]);
  const navigate = useNavigate();
  const data = dataSlides;
  const { productList, loading, pagination } = useProductList(queryParams);

  const classes = useStyles();
  const handleSortChange = (newSort) => {
    const filters = {
      ...queryParams,
      _sort: newSort,
    };
    let locationSearch = {
      pathname: location.pathname,
      search: queryString.stringify(filters),
    };
    navigate(locationSearch);
  };
  const handleFiltersChange = (newFilters) => {
    const filters = { ...queryParams, ...newFilters };
    let locationSearch = {
      pathname: location.pathname,
      search: queryString.stringify(filters),
    };
    navigate(locationSearch);
  };
  const handlePageChange = (e, page) => {
    const filters = {
      ...queryParams,
      _page: page,
    };
    let locationSearch = {
      pathname: location.pathname,
      search: queryString.stringify(filters),
    };
    navigate(locationSearch);
  };

  const [openQuickView, setOpenQuickView] = useState(false);
  const [productQuickView, setProductQuickView] = useState();
  const onQuickView = (product) => {
    setProductQuickView(product);
    console.log('quick view', product);
    setOpenQuickView(true);
  };
  const handleCloseQuickView = () => {
    setOpenQuickView(false);
  };
  const dispatch = useDispatch();
  const handleAddToCartSubmit = async (values) => {
    try {
      const action = addToCart({
        id: productQuickView.id,
        product: productQuickView,
        quantity: values.quantity,
      });
      await dispatch(action);
    } catch (error) {
      console.log('loi o details', error);
    }
  };
  return (
    <div>
      <div className={classes.grid}>
        <div className={classes.carousel + ' ' + classes.gridItem}>
          <Slide dataSlides={data} />
        </div>
        <div className={classes.banner + ' ' + classes.gridItem}>
          <Banner />
        </div>
      </div>
      <Box>
        <Box className={classes.container}>
          <Grid container>
            <Grid sx={{ backgroundColor: 'white' }} item xs={12} sm={12} md={9.5} lg={10}>
              <ProductSort currentSort={queryParams._sort} onChange={handleSortChange} />

              {loading ? (
                <SkeletonProduct length={pagination.limit} />
              ) : (
                <ThemeProvider theme={theme}>
                  <Grid container>
                    {productList.map((product) => (
                      <GridWithSS
                        item
                        key={product.id}
                        ss={12}
                        xs={6}
                        sm={4}
                        md={3}
                        lg={3}
                      >
                        <Product product={product} onQuickView={onQuickView} />
                      </GridWithSS>
                    ))}
                  </Grid>
                </ThemeProvider>
              )}
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Pagination
                  siblingCount={1}
                  color="primary"
                  count={Math.ceil(pagination.total / pagination.limit)}
                  page={pagination.page}
                  onChange={handlePageChange}
                ></Pagination>
              </Box>
            </Grid>
            <Grid
              item
              xs={0}
              sm={0}
              md={2.5}
              lg={2}
              sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}
            >
              <Box sx={{ px: 1 }}>
                <Paper elevation={2}>
                  <ProductFilters filters={queryParams} onChange={handleFiltersChange} />
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Dialog
        className={classes.dialogQuickView}
        open={openQuickView}
        disableScrollLock={true}
        onClose={handleCloseQuickView}
      >
        <DialogContent className={classes.dialogContent}>
          <button onClick={handleCloseQuickView} className={classes.btnCloseQuickView}>
            <CloseIcon />
          </button>
          <Grid container>
            <Grid item xs={12} sm={6} md={5} lg={5}>
              <ProductThumnail product={productQuickView} />
            </Grid>
            <Grid item xs={12} sm={6} md={7} lg={7}>
              <ProductInfor product={productQuickView} />
              <AddToCartForm onSubmit={handleAddToCartSubmit} />
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default MainPage;
