import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import { useState } from 'react';

Review.propTypes = {
  product: PropTypes.object,
};
const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    padding: '10px 20px',
  },
  divContent: {
    position: 'relative',
    height: '500px',
    overflow: 'hidden',
    '& #editor-content': {
      padding: '0 20px',
    },
    '& strong': {
      fontSize: '18px',
    },
    '& span': {
      fontSize: '1rem',
    },
  },
  divShowContent: {
    position: 'relative',
    height: '100%',
  },
  divbg: {
    backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0), rgb(255, 255, 255))',
    height: '200px',
    position: 'absolute',
    bottom: '0',
    left: '0',
    right: '0',
    visibility: 'visible',
  },
  btnShow: {
    width: '20%',
    position: 'absolute',
    bottom: '10px',
    left: '0',
    right: '0',
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: 'transparent',
    border: '1px solid #1976d2',
    borderRadius: '5px',
    '&:hover': {
      color: 'white',
      backgroundColor: '#1976d2',
    },
  },
  divbgHidden: {
    visibility: 'hidden',
  },
}));
function Review({ product }) {
  const [heightContent, setHeightContent] = useState(false);
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box className={heightContent ? classes.divShowContent : classes.divContent}>
        <h3>Reviews</h3>
      </Box>
    </Box>
  );
}

export default Review;
