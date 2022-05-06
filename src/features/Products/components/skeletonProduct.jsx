import React from 'react';
import PropTypes from 'prop-types';
import { Skeleton, Box, Grid } from '@mui/material';

SkeletonProduct.propTypes = {
  length: PropTypes.number,
};
function SkeletonProduct({ length }) {
  return (
    <Box>
      <Grid container>
        {Array.from(new Array(length)).map((x, index) => (
          <Grid item key={index} item xs={6} sm={4} md={3} lg={3}>
            <Box padding={1}>
              <Skeleton variant="rect" width="100%" height={193} />
              <Skeleton width="100%" />
              <Skeleton width="60%" />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default SkeletonProduct;
