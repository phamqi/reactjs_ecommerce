import { Box, Grid, Button } from '@mui/material';
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import Product from '../components/Product';
import { useDispatch } from 'react-redux';
import addToCart from '../../Cart/cartSlice';

ProductList.propTypes = {
  data: PropTypes.array,
};
function ProductList({ data }) {
  return (
    <Box>
      <Grid container>
        {data.map((product) => (
          <Grid item key={product.id} xs={6} sm={4} md={3} lg={3}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default memo(ProductList);
