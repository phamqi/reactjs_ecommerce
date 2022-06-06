import { Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import Product from '../components/Product';

ProductList.propTypes = {};
const theme = createTheme({
  breakpoints: {
    keys: ['ss', 'xs', 'sm', 'md', 'lg', 'xl'],
    values: {
      ss: 0,
      xs: 420,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1500,
    },
  },
});
const GridWithSS = ({ ss, ...other }) => {
  const ssClass = `MuiGrid-grid-ss-${ss}`;
  return <Grid className={ssClass} {...other} />;
};

function ProductList({ data }) {
  return (
    <ThemeProvider theme={theme}>
      <Grid container>
        {data.map((product) => (
          <GridWithSS item key={product.id} ss={12} xs={6} sm={4} md={3} lg={3}>
            <Product product={product} />
          </GridWithSS>
        ))}
      </Grid>
    </ThemeProvider>
  );
}

export default memo(ProductList);
