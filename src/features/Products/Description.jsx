import { Box, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import { memo, useState } from 'react';

Description.propTypes = {
  product: PropTypes.object,
};
const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    padding: '30px 20px 50px 20px',
  },
  divContent: {
    position: 'relative',
    height: '300px',
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
  btnDetail: {
    '-webkit-font-smoothing': 'antialiased',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    outline: 0,
    margin: 0,
    cursor: 'pointer',
    userSelect: 'none',
    verticalAlign: 'middle',
    ' -webkit-appearance': 'none',
    textDecoration: 'none',
    fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
    fontWeight: 500,
    fontSize: '0.875rem',
    lineHeight: '1.75',
    textTransform: 'uppercase',
    minWidth: '64px',
    padding: '0.3rem 0.5rem',
    color: '#717fe0',
    left: 0,
    right: 0,
    width: 'fit-content',
    border: '1px solid #717fe0',
    bottom: '0.7rem',
    position: 'absolute',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: '5px',
    backgroundColor: 'transparent',
    zIndex: '9',
    '&:hover': {
      color: '#fff',
      backgroundColor: '#717fe0',
    },
  },
}));
function Description({ product }) {
  const [heightContent, setHeightContent] = useState(false);
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box
        className={heightContent ? classes.divShowContent : classes.divContent}
        dangerouslySetInnerHTML={{ __html: product.description }}
      ></Box>
      <Box className={heightContent ? classes.divBgHidden : classes.divBg}></Box>
      <a href="#description">
        <button
          className={classes.btnDetail}
          onClick={() => setHeightContent(!heightContent)}
        >
          {heightContent ? `Show less` : `Show more`}
        </button>
      </a>
    </Box>
  );
}

export default memo(Description);
