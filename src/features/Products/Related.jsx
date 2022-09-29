import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import { memo, useState } from 'react';
import { LIMIT } from '../../constants';
import SkeletonProduct from './skeletonProduct';
import { useProductByCategory } from '../../hook';
import Product from './Product/ProductRelated';
Related.propTypes = {
  category: PropTypes.number,
};

const useStyles = makeStyles((theme) => ({
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
      backgroundColor: '#888',
    },
    '&::-webkit-scrollbar-button': {
      display: 'block',
      width: '10vw',
    },
    '&> div > div': { width: '100%' },
  },
  root: {
    position: 'relative',
    '&> button.btnNext': {
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
      bottom: '50%',
      right: '0',
    },
    '&> button.btnPrev': {
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
      bottom: '50%',
      left: '0',
    },
  },
  text: {
    width: 'fit-content',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  boxRelated: {
    display: 'flex',
    overflowY: 'hidden',
    '& .relatedSke': {
      flexWrap: 'nowrap',
      height: '168px',
    },
  },
}));
function Related({ category }) {
  const classes = useStyles();
  const [translate, setTranslate] = useState(0);

  const { productList, loading } = useProductByCategory(category);

  const handleSetNext = () => {
    var a = 0;
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
    var a = ~~(window.innerWidth / 300);
    if (translate === 0) {
      handleSetNext();
    } else {
      setTranslate(translate + (10 / (6 - a)) * 10);
    }
  };

  return (
    <Box className={classes.root}>
      <h2 className={classes.text}>Related</h2>
      <Box
        className={classes.related}
        sx={{
          overflowX: { xs: 'auto', sm: 'auto', md: 'hidden', lg: 'hidden' },
        }}
      >
        <Box
          className={classes.boxRelated}
          sx={{
            width: {
              xs: 'min(600%, max(400%, calc((420px - 100vw)*999999)))',
              sm: '400%',
              md: '300%',
              lg: '200%',
            },
            overflowX: { xs: 'auto', sm: 'auto', md: 'hidden', lg: 'hidden' },
            transform: {
              xs: 'translateX(0)',
              sm: 'translateX(0)',
              md: `translateX(${translate}%)`,
            },
          }}
        >
          {loading ? (
            <SkeletonProduct length={LIMIT} />
          ) : (
            productList.map((item, index) => <Product key={index} product={item} />)
          )}
        </Box>
      </Box>
      <Button
        onClick={handleSetPrev}
        className="btnPrev"
        sx={{ visibility: { xs: 'hidden', sm: 'hidden', md: 'visible' } }}
      >
        <ArrowBackIosOutlinedIcon />
      </Button>
      <Button
        onClick={handleSetNext}
        className="btnNext"
        sx={{ visibility: { xs: 'hidden', sm: 'hidden', md: 'visible' } }}
      >
        <ArrowForwardIosIcon />
      </Button>
    </Box>
  );
}

export default memo(Related);
