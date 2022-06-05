import React from 'react';
import PropTypes from 'prop-types';
import { Skeleton, Box, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { HEIGHT_SKT } from '../../../constants';

SkeletonProduct.propTypes = {
  length: PropTypes.number,
};
const useStyles = makeStyles((theme) => ({
  boxSkeleton: {
    boxSizing: 'border-box',
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    flexDirection: 'row',
  },
}));
function SkeletonProduct({ length }) {
  const classes = useStyles();
  return (
    <Box>
      <Grid container className={`${classes.boxSkeleton}` + ' relatedSke'}>
        {Array.from(new Array(length)).map((x, index) => (
          <Grid item key={index} xs={6} sm={4} md={3} lg={3}>
            <Box padding={1}>
              <Skeleton variant="rect" width="100%" height={HEIGHT_SKT} />
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
