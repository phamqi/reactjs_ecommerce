import { Box, Grid } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { makeStyles } from '@mui/styles';
import queryString from 'query-string';
import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { CustomizeGrid, Product } from '../components';
import QuickViewDialog from '../components/QuickViewDialog';
import Banner from '../features/Banner';
import { ProductFilters, SkeletonProduct } from '../features/Products';
import Slide from '../features/Slide';
import { dataSlides } from '../features/Slide/dataSlides';
import { useProductList } from '../hook';

MainPage.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    top: '50%',
    right: 10,
    zIndex: 1,
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
        margin: '0 15px',
        height: 'fit-content',
        border: 'none',
        borderRadius: '8px',
        maxWidth: '900px',
        '& .MuiDialogContent-root': {
          padding: '1.7rem',
          paddingTop: '0.7rem',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      },
    },
  },
  handleQuickView: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  btnCloseQuickView: {
    margin: '0',
    padding: '0',
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
  pagination: {
    '& > ul > li > .MuiPaginationItem-root.Mui-selected': {
      backgroundColor: '#717fe0',
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
    console.log(navigate(locationSearch));
  };

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
      <div>
        <div className={classes.carousel}>
          <Slide dataSlides={data} />
        </div>
        <div id="banner" className={classes.banner}>
          <Banner />
        </div>
      </div>
      <div id="products_list">
        <Box className={classes.container}>
          <Box container sx={{ maxWidth: '1200px' }}>
            <Box sx={{ backgroundColor: 'white', padding: '8px' }}>
              <ProductFilters
                filters={queryParams}
                onChange={handleFiltersChange}
                handleSortChange={handleSortChange}
              />
              {loading ? (
                <SkeletonProduct length={pagination.limit} />
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
            </Box>
          </Box>
        </Box>
      </div>
      <QuickViewDialog
        dialogState={dialogState}
        product={productQuickView}
        handleCloseQuickView={handleCloseQuickView}
      />
    </div>
  );
}

export default MainPage;
