import { Box, Grid, Paper } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { makeStyles } from '@mui/styles';
import queryString from 'query-string';
import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Slide from '../../Slide';
import Banner from '../../Banner';
import { dataSlides } from '../../Slide/dataSlides';
import ProductFilters from '../components/Filters';
import ProductList from '../components/ProductList';
import ProductSort from '../components/ProductSort';
import SkeletonProduct from '../components/skeletonProduct';
import useProductList from '../hook/useProductList';
ListPage.propTypes = {};
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
  grid: {
    height: 'max(100vh, min(135vh, calc((100vw - 600px) * 99999)))',
    display: 'grid',
    gridRowGap: '40px',
    gridTemplateColumns: 'unset',
    gridTemplateRows:
      'calc(100vh - 40px) max(35vh, min(60vh, calc((600px - 100vw ) * 99999)))',
    scrollSnapType: 'y mandatory',
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
      width: '0',
    },
  },
  gridItem2: {
    scrollSnapAlign: 'start',
  },
  gridItem: {
    scrollSnapAlign: 'end',
  },
  carousel: {},
  banner: {},
}));
function ListPage() {
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
      <div className={classes.grid}>
        <div className={classes.carousel + ' ' + classes.gridItem}>
          <Slide dataSlides={data} />
        </div>
        <div className={classes.banner + ' ' + classes.gridItem2}>
          <Banner />
        </div>
      </div>
      <Box>
        <Box className={classes.container}>
          <Grid container>
            <Grid sx={{ backgroundColor: 'white' }} item xs={12} sm={9} md={9.5} lg={10}>
              <ProductSort currentSort={queryParams._sort} onChange={handleSortChange} />

              {loading ? (
                <SkeletonProduct length={pagination.limit} />
              ) : (
                <ProductList data={productList} />
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
            <Grid className={classes.left} item xs={12} sm={3} md={2.5} lg={2}>
              <Box sx={{ px: 1 }}>
                <Paper elevation={2}>
                  <ProductFilters filters={queryParams} onChange={handleFiltersChange} />
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
}

export default ListPage;
