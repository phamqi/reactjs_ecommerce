import { Box, Button } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import productApi from '../../../api/productApi';
import SkeletonProduct from '../components/skeletonProduct';
import Product from './Product';
import { makeStyles } from '@mui/styles';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
Related.propTypes = {
  category: PropTypes.number,
};

const useStyles = makeStyles((theme) => ({
  root: { backgroundColor: 'white' },
  relatedm: {
    marginTop: '1.5rem',
    backgroundColor: 'white',
    position: 'relative',
    overflowX: 'auto',
    overflowY: 'hidden',
  },
  related: {
    paddingBottom: '5px',
    margin: '1.5rem 0',
    backgroundColor: 'white',
    position: 'relative',
    '&::-webkit-scrollbar': {
      height: '0.7rem',
    },
    '&::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.3)',
      backgroundColor: '#F5F5F5',
      borderRadius: '10px',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '10px',
      backgroundImage:
        'linear-gradient(to right , rgb(28,58,148) ,rgb(73,125,189), rgb(122,153,217))',
    },
    '&::-webkit-scrollbar-button': {
      height: '30%',
      width: '30%',
    },
    '&> div > div': { width: '100%' },
    '&> h2': {
      marginLeft: '1rem',
    },
  },
  relateds: {
    position: 'relative',
    '&> button.btn': {
      padding: '0',
      margin: '0',
      height: '32px',
      minWidth: '32px',
      color: 'black',
      borderRadius: '50%',
      backgroundColor: 'white',
      boxShadow: '0px 1px 3px grey',
      position: 'absolute',
      zIndex: '1',
      bottom: '40%',
      right: '0',
    },
    '&> button.btnn': {
      padding: '0',
      margin: '0',
      height: '32px',
      minWidth: '32px',
      color: 'black',
      borderRadius: '50%',
      backgroundColor: 'white',
      boxShadow: '0px 1px 3px grey',
      position: 'absolute',
      zIndex: '1',
      bottom: '40%',
      left: '0',
    },
  },
  boxRelated: {
    display: 'flex',
    overflowY: 'hidden',
  },
}));
function Related({ category }) {
  const [overflow, setOverflow] = useState();
  const classes = useStyles();
  const [loading, setLoading] = useState();
  const [translate, setTranslate] = useState(0);
  const params = {
    'category.id': category,
    _limit: 12,
  };
  const [itemList, setItemList] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await productApi.getByCategory(params);
        console.log('List product by category', data);
        setItemList(data);
        setLoading(false);
      } catch (error) {
        console.log('fail to get product', error);
      }
    })();
  }, [category]);
  const handleSetNext = () => {
    let a = 0;
    if (~~(window.innerWidth / 300) >= 4) {
      a = 4;
    } else {
      a = ~~(window.innerWidth / 300);
    }
    if (translate <= -(10 / (6 - a)) * 10 * (6 - a - 1)) {
      setTranslate(0);
    } else {
      setTranslate(translate + -(10 / (6 - a)) * 10);
    }
  };
  const handleSetPrev = () => {
    const a = ~~(window.innerWidth / 300);
    if (translate == 0) {
      handleSetNext();
    } else {
      setTranslate(translate + (10 / (6 - a)) * 10);
    }
  };

  return (
    <Box className={classes.relateds}>
      <Box
        className={classes.related}
        sx={{
          overflowX: { xs: 'auto', sm: 'auto', md: 'hidden', lg: 'hidden' },
          overflowY: 'hidden',
        }}
      >
        <h2>Related</h2>
        <Box
          className={classes.boxRelated}
          sx={{
            width: { xs: '400%', sm: '300%', md: '300%', lg: '200%' },
            overflowX: { xs: 'auto', sm: 'auto', md: 'hidden', lg: 'hidden' },
            transform: {
              xs: 'translateX(0)',
              sm: 'translateX(0)',
              md: `translateX(${translate}%)`,
            },
          }}
        >
          {loading ? (
            <SkeletonProduct />
          ) : (
            itemList.map((item, index) => <Product key={index} product={item} />)
          )}
        </Box>
      </Box>
      <Button
        onClick={handleSetPrev}
        className="btnn"
        sx={{ visibility: { xs: 'hidden', sm: 'hidden', md: 'visible' } }}
      >
        <ArrowBackIosOutlinedIcon />
      </Button>
      <Button
        onClick={handleSetNext}
        className="btn"
        sx={{ visibility: { xs: 'hidden', sm: 'hidden', md: 'visible' } }}
      >
        <ArrowForwardIosIcon />
      </Button>
    </Box>
  );
}

export default Related;
