import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/material';
import { dataStore } from './dataStoreInfor';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import LoyaltyOutlinedIcon from '@mui/icons-material/LoyaltyOutlined';
import Replay5Icon from '@mui/icons-material/Replay5';
StoreInfor.propTypes = {};
const useStyles = makeStyles((theme) => ({
  root: {
    width: '45px',
  },
  item: {},
  text: {},
  text_sub: {},
}));
function StoreInfor(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <MonetizationOnOutlinedIcon fontSize="i" />
      {dataStore.map((item) => (
        <Box key={item.id} className={classes.item}>
          <Box>{item.icon}</Box>
          <Box className={classes.text}>
            <h5>{item.text}</h5>
            <span className={classes.text_sub}>{item.text_sub}</span>
          </Box>
        </Box>
      ))}
    </div>
  );
}

export default StoreInfor;
