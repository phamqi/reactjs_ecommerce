import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    boxSizing: 'border-box',
    padding: 'min(15px , max(calc(( 100vw - 376px)*9999), 0px))',
    paddingBottom: '35px',
  },
  divName: {
    minHeight: '2.5rem',
    '&:hover': {
      '& $name': {
        color: '#717fe0',
      },
    },
  },
  productImg: {
    width: '100%',
    aspectRatio: '1/1.4',
    objectFit: 'cover',
    display: 'block',
    overflow: 'hidden',
    position: 'relative',
    transform: 'scale(1)',
  },
  imgBox: {
    display: 'block',
    position: 'relative',
    overflow: 'hidden',
  },
  skeleton: {
    display: 'inline-block',
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#cbcbcb',
    '&::after': {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      transform: 'translateX(-100%)',
      backgroundImage: `linear-gradient(
        90deg,
        rgba(255,255,255, 0) 0,
        rgba(255,255,255, 0.2) 20%,
        rgba(255,255,255, 0.5) 60%,
        rgba(255,255,255, 0)
      )`,
      animation: `$shimmer 3s infinite`,
      content: `''`,
    },
  },
  '@keyframes shimmer': {
    '100%': {
      transform: 'translateX(100%)',
    },
  },
}));
SkeletonProduct.propTypes = {};

function SkeletonProduct() {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.imgBox}>
        <div
          style={{ width: '300px', aspectRatio: '1/1.4' }}
          className={classes.skeleton}
        />
      </Box>
      <Box
        sx={{
          cursor: 'pointer',
          paddingTop: '10px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box className={classes.divName}>
          <p
            style={{ width: '100%', height: '1rem', borderRadius: '8px' }}
            className={classes.skeleton}
          ></p>
        </Box>
        <Box>
          <span
            style={{ width: '100%', height: '1rem', borderRadius: '8px' }}
            className={classes.skeleton}
          ></span>
        </Box>
      </Box>
    </Box>
  );
}

export default SkeletonProduct;
