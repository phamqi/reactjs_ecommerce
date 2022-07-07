import CloseIcon from '@mui/icons-material/Close';
import { Box, Dialog, DialogContent, Grid, Paper } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { makeStyles } from '@mui/styles';
import { useSnackbar } from 'notistack';
import queryString from 'query-string';
import { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import GridSS from '../components/CustomGrid/GridSS';
import AddToCartForm from '../components/form-control/addToCart';
import Banner from '../features/Banner';
import { addToCart } from '../features/Cart/cartSlice';
import ProductFilters from '../features/Products/components/Filters';
import ProductSort from '../features/Products/components/Filters/ProductSort';
import Product from '../features/Products/components/Product';
import ProductInfor from '../features/Products/components/ProductInfor';
import ProductThumnail from '../features/Products/components/ProductThumnail';
import SkeletonProduct from '../features/Products/components/skeletonProduct';
import useProductList from '../features/Products/hook/useProductList';
import Slide from '../features/Slide';
import { dataSlides } from '../features/Slide/dataSlides';

MainPage.propTypes = {};

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
        width: 'max(80vw, min(100vw, (calc((600px - 100vw)*99999))))',
        margin: '0',
        height: 'max(100%, min(100vw, (calc((600px - 100vw)*99999))))',
        border: 'none',
        borderRadius: '8px',
        maxWidth: '1200px',
        '& .MuiDialogContent-root ': {
          overFlow: 'hidden',
          padding: '20px 24px',
          overflowY: 'hidden',
        },
      },
    },
  },
  handleQuickView: {
    display: 'flex',
    justifyContent: 'flex-end',
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
    setOpenQuickView(true);
  };
  const handleCloseQuickView = () => {
    setOpenQuickView(false);
  };

  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const handleAddToCartSubmit = async (values) => {
    try {
      const action = addToCart({
        id: productQuickView.id,
        product: productQuickView,
        quantity: values.quantity,
      });
      await dispatch(action);
      enqueueSnackbar('Add to cart successfully', { variant: 'success' });
    } catch (error) {}
  };
  return (
    <div>
      <div>
        <div className={classes.carousel}>
          <Slide dataSlides={data} />
        </div>
        <div className={classes.banner}>
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
                <Grid container>
                  {productList.map((product, index) => (
                    <GridSS key={index} ss={12} xs={6} sm={4} md={3} lg={3}>
                      <Product product={product} onQuickView={onQuickView} />
                    </GridSS>
                  ))}
                </Grid>
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
          <div className={classes.handleQuickView}>
            <button onClick={handleCloseQuickView} className={classes.btnCloseQuickView}>
              <CloseIcon />
            </button>
          </div>
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
