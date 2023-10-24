import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import { memo, useEffect, useRef, useState } from 'react';

import { LIMIT } from '../../constants';
import { useProductByCategory } from '../../hook';
import { Product, CustomizeGrid, SkeletonProduct } from '../../components';
Related.propTypes = {
  category: PropTypes.number,
};

const useStyles = makeStyles((theme) => ({
  related: {
    paddingBottom: '5px',
    margin: '1.5rem 0',
    backgroundColor: 'white',
    position: 'relative',
  },
  root: {
    maxWidth: '1200px',
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  productList: {
    position: 'relative',
    padding: '3rem 2rem',
  },
  btn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '35px',
    aspectRatio: '1/1',
    position: 'absolute',
    zIndex: 9,
    bottom: '55%',
    backgroundColor: 'transparent',
    boxShadow: 'none',
    border: 'none',
    borderRadius: '15%',
    color: '#000',
    ' &.next': {
      right: 0,
      animation: '$ani-bounce 2s infinite',
    },

    ' &.prev': {
      left: 0,
    },
    '&:hover': {
      backgroundColor: '#717fe09e',
      color: '#fff',
    },
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'unset',
    gridAutoFlow: 'column',
    overflowX: 'auto',
    overflowY: 'hidden',
    scrollSnapType: 'x mandatory',
    scrollSnapStop: 'always',
    gridAutoColumns: 'var(--display)',
    '&::-webkit-scrollbar': {
      height: '0.7rem',
    },
    '&::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.3)',
      backgroundColor: '#717fe036',
      borderRadius: '10px',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '10px',
      backgroundColor: '#717fe0',
    },
    '&::-webkit-scrollbar-button': {
      display: 'block',
      width: '12%',
    },
  },
  gridItem: {
    scrollSnapAlign: 'start',
  },
  '@keyframes ani-bounce': {
    '0%,100%': {
      transform: 'translateX(-50%)',
      animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
    },
    '50%': {
      transform: 'none',
      animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
    },
  },
}));
function Related({ category }) {
  const classes = useStyles();
  const [displayedProduct, setDisplayedProduct] = useState();
  const { productList, loading } = useProductByCategory(category);
  const section = useRef();
  let distance = 0;
  const limitProduct = 12;
  const nextSlide = (section) => {
    const itemWidth = section.children[0].clientWidth;
    if (section.scrollLeft >= (limitProduct - displayedProduct) * itemWidth - 50) {
      section.scrollBy({
        left: -section.clientWidth * limitProduct,
        behavior: 'smooth',
      });
      distance = 0;
    } else {
      section.scrollBy({
        left: itemWidth,
        behavior: 'smooth',
      });
    }
  };
  const prevSlide = (section) => {
    const itemWidth = section.children[0].clientWidth;
    if (section.scrollLeft < 50) {
      distance = itemWidth * limitProduct;
      section.scrollBy({
        left: distance,
        behavior: 'smooth',
      });
    } else {
      distance = 0;
      section.scrollBy({
        left: (distance -= itemWidth),
        behavior: 'smooth',
      });
    }
  };

  const checkResizeEvent = () => {
    try {
      if (section && section.current.clientWidth > 1100) {
        setDisplayedProduct(6);
      }
      if (section && section.current.clientWidth > 992) {
        setDisplayedProduct(6);
      }
      if (section && section.current.clientWidth < 992) {
        setDisplayedProduct(4);
      }
      if (section && section.current.clientWidth < 768) {
        setDisplayedProduct(3);
      }
      if (section && section.current.clientWidth < 576) {
        setDisplayedProduct(2);
      }
      if (section && section.current.clientWidth < 376) {
        setDisplayedProduct(1);
      }
    } catch (error) {}
  };
  useEffect(() => {
    checkResizeEvent();
    window.onresize = checkResizeEvent;
  }, [displayedProduct]);
  const prevProduct = () => {
    if (section) {
      prevSlide(section.current);
    }
  };
  const nextProduct = () => {
    if (section) {
      nextSlide(section.current);
    }
  };
  return (
    <Box className={classes.root}>
      <Grid>
        <CustomizeGrid
          sl={12}
          xs={6}
          sm={6}
          md={4}
          lg={3}
          xl={3}
          sx={{ width: '100%' }}
        />
      </Grid>
      <Box className={classes.productList}>
        <button className={classes.btn + ' prev'} onClick={prevProduct}>
          <ArrowBackIosOutlinedIcon />
        </button>
        <button className={classes.btn + ' next'} onClick={nextProduct}>
          <ArrowForwardIosIcon />
        </button>
        {!loading ? (
          <Box
            className={classes.gridContainer}
            ref={section}
            style={{ '--display': `${100 / displayedProduct}%` }}
          >
            {productList.map((product, index) => (
              <Box key={index} className={classes.gridItem}>
                <Product product={product} isQuickView={false} />
              </Box>
            ))}
          </Box>
        ) : (
          <Box
            className={classes.gridContainer}
            ref={section}
            style={{ '--display': `${100 / displayedProduct}%` }}
          >
            {Array.from(Array(6)).map((item, index) => (
              <Box key={index}>
                <SkeletonProduct />
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default memo(Related);
