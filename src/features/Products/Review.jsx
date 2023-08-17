import { Box, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import { useState } from 'react';

Review.propTypes = {
  product: PropTypes.object,
};
const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    padding: '30px 20px 50px 20px',
    '& h4': {
      color: '#999',
    },
    '&> button.btnShow': {
      width: '20%',
      position: 'absolute',
      bottom: '10px',
      left: '0',
      right: '0',
      marginLeft: 'auto',
      marginRight: 'auto',
      backgroundColor: 'transparent',
      border: '1px solid #717fe0',
      borderRadius: '5px',
      color: '#717fe0',
      '&:hover': {
        color: '#fff',
        backgroundColor: '#717fe0',
      },
    },
  },
  divContent: {
    position: 'relative',
    minHeight: '200px',
    overflow: 'hidden',
    height: 'fit-content',
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
  divBg: {
    backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0), rgb(255, 255, 255) 84%)',
    height: '150px',
    position: 'absolute',
    bottom: '0',
    left: '0',
    right: '0',
    visibility: 'visible',
  },

  divBgHidden: {
    visibility: 'hidden',
  },
}));
function Review({ product }) {
  const [heightContent, setHeightContent] = useState(false);
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <h4>Review</h4>
      <Box className={heightContent ? classes.divShowContent : classes.divContent}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium minima
          laudantium quidem vero, tempora quas? Ullam, enim. Ea laudantium voluptatibus
          nostrum reprehenderit sequi tempore, at in ex natus modi veritatis.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium minima
          laudantium quidem vero, tempora quas? Ullam, enim. Ea laudantium voluptatibus
          nostrum reprehenderit sequi tempore, at in ex natus modi veritatis.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium minima
          laudantium quidem vero, tempora quas? Ullam, enim. Ea laudantium voluptatibus
          nostrum reprehenderit sequi tempore, at in ex natus modi veritatis.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium minima
          laudantium quidem vero, tempora quas? Ullam, enim. Ea laudantium voluptatibus
          nostrum reprehenderit sequi tempore, at in ex natus modi veritatis.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium minima
          laudantium quidem vero, tempora quas? Ullam, enim. Ea laudantium voluptatibus
          nostrum reprehenderit sequi tempore, at in ex natus modi veritatis.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium minima
          laudantium quidem vero, tempora quas? Ullam, enim. Ea laudantium voluptatibus
          nostrum reprehenderit sequi tempore, at in ex natus modi veritatis.
        </p>
      </Box>
      <Box className={heightContent ? classes.divBgHidden : classes.divBg}></Box>
      <Button className="btnShow" onClick={() => setHeightContent(!heightContent)}>
        {heightContent ? `Hidden` : `Show`}
      </Button>
    </Box>
  );
}

export default Review;
