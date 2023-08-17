import { Box, Grid } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { makeStyles } from '@mui/styles';
import queryString from 'query-string';
import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  CustomizeGrid,
  ListProductPagination,
  Product,
  SkeletonProduct,
} from '../components';
import QuickViewDialog from '../components/QuickViewDialog';
import Banner from '../features/Banner';
import { ProductFilters } from '../features/Products';
import Slide from '../features/Slide';
import { dataSlides } from '../constants';
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
  };

  return (
    <div>
      <div className={classes.carousel}>
        <Slide dataSlides={data} />
      </div>
      <div id="banner" className={classes.banner}>
        <Banner />
      </div>

      <Box className={classes.container}>
        <Box container sx={{ maxWidth: '1200px' }}>
          <Box sx={{ backgroundColor: 'white', padding: '8px' }}>
            <ProductFilters
              filters={queryParams}
              onChange={handleFiltersChange}
              handleSortChange={handleSortChange}
            />
            <ListProductPagination
              loading={loading}
              productList={productList}
              handlePageChange={handlePageChange}
              pagination={pagination}
            />
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default MainPage;
