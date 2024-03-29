import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { cartItemsCountSelector } from '../Cart/selector';

NavBarMobile.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: '9999',
    position: 'fixed',
    top: 'auto',
    left: 'auto',
    opacity: '1',
  },
  btnSpeedDial: {
    '& > button': {
      width: '3rem',
      height: '3rem',
      backgroundColor: '#717fe0',
      '&:hover': {
        backgroundColor: '#717fe0',
        opacity: '0.9',
      },
    },
  },
}));

function NavBarMobile(props) {
  const classes = useStyles();
  const countItems = useSelector(cartItemsCountSelector);
  const [pxX, setPxX] = useState(20);
  const [pxY, setPxY] = useState(50);

  const handleMoveOnTouch = (e) => {
    setPxX(window.innerWidth - e.touches[0].clientX);
    setPxY(window.innerHeight - e.touches[0].clientY);
  };
  return (
    <Box
      className={classes.root}
      onTouchMove={handleMoveOnTouch}
      sx={{
        display: { xs: 'block', sm: 'none' },
        bottom: `${pxY}px`,
        right: `${pxX}px`,
        padding: '10px',
      }}
    >
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        icon={<SpeedDialIcon />}
        className={classes.btnSpeedDial}
      >
        <SpeedDialAction
          key="1"
          icon={
            <NavLink to="/">
              <HomeIcon />
            </NavLink>
          }
          tooltipTitle="Home"
        />
        <SpeedDialAction
          key="2"
          icon={
            <NavLink to="/cart">
              <Badge badgeContent={countItems} color="error">
                <ShoppingCartIcon />
              </Badge>
            </NavLink>
          }
          tooltipTitle="Cart"
        />
        <SpeedDialAction
          key="3"
          icon={
            <ExpandLessIcon
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  left: 0,
                  behavior: 'smooth',
                });
              }}
            />
          }
          tooltipTitle="Back to Top"
        />
      </SpeedDial>
    </Box>
  );
}

export default memo(NavBarMobile);
