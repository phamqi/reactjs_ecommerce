import { Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import React from 'react';
import { NavLink } from 'react-router-dom';

ProductMenu.propTypes = {};
const useStyles = makeStyles((theme) => ({
  root: {
    '&> div': {
      display: 'flex',
      justifyContent: 'space-around',
      '&> div > a': {
        margin: '0.5rem',
        textDecoration: 'none',
        fontSize: '1.3rem',
        // color: 'rgb(120,120,120)',
        wordSpacing: '-2px',
        color: 'black',
      },
    },
  },
}));
function ProductMenu(props) {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Container className={classes.root}>
        <Box>
          <NavLink to="">Chi tiet san pham</NavLink>
          <NavLink to="reviews">Danh gia</NavLink>
        </Box>
      </Container>
    </Box>
  );
}

export default ProductMenu;
