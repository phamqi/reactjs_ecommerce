import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { Box, Grid } from '@mui/material';

import BannerItem from './BannerItem';
import { dataBanner } from './dataBanner';
Banner.propTypes = {};
const useStyles = makeStyles((theme) => ({
  root: {},
  item: {},
  text: {},
  text_sub: {},
}));
function Banner(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Grid
          container
          sx={{
            maxWidth: '1200px',
            justifyContent: 'space-between',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          {dataBanner.map((item) => (
            <Grid item xs={12} sm={3.8} md={3.8} lg={3.8}>
              <BannerItem key={item.id} dataBanner={item} />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}

export default Banner;
