import React from 'react';
import PropTypes from 'prop-types';
import { Skeleton } from '@mui/material';

SkeletonPage.propTypes = {};

function SkeletonPage(props) {
  return (
    <div>
      <Skeleton variant="rect" width="100%" height="50vh" />
    </div>
  );
}

export default SkeletonPage;
