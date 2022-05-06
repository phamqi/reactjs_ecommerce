import { Box, Container, Grid, Paper } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState, useMemo } from 'react';
import productApi from '../../../api/productApi';
import ProductFilters from '../components/ProductFilters';
import ProductList from '../components/ProductList';
import ProductSort from '../components/ProductSort';
import SkeletonProduct from '../components/skeletonProduct';
import queryString from 'query-string';
import { useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
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
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, limit: 12, total: 10 });
  useEffect(() => {
    (async () => {
      try {
        const { data, pagination } = await productApi.getAll(queryParams);
        console.log('List product', data, pagination);
        setProductList(data);
        setPagination(pagination);
      } catch (error) {
        console.log('fail to get product', error);
      }
      setLoading(false);
    })();
  }, [queryParams]);

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
  useEffect(() => {
    (async () => {
      try {
        const { data } = await productApi.search();
        console.log('List product by category', data);
      } catch (error) {
        console.log('fail to get product', error);
      }
    })();
  }, []);
  return (
    <div>
      <Box pt={2}>
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
            <Grid
              className={classes.left}
              item
              sx={{
                display: { xs: 'none', md: 'block', sm: 'block' },
                position: { xs: 'fixed', sm: 'static', md: 'static' },
              }}
              xs={6}
              sm={3}
              md={2.5}
              lg={2}
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
    </div>
  );
}

export default ListPage;
