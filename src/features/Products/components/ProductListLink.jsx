import { Box, Grid } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import ProductLink from './ProductLink';

ProductListLink.propTypes = {
  data: PropTypes.array,
};
function ProductListLink({ data }) {
  return (
    <Box>
      <Grid container>
        {data.map((product) => (
          <Grid item key={product.id} xs={6} sm={4} md={3} lg={3}>
            <ProductLink product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ProductListLink;
