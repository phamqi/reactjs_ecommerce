import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import MiniCart from '../Cart/MiniCart';
import { cartItemsCountSelector } from '../Cart/selector';

BadgeCart.propTypes = {};

function BadgeCart(props) {
  const [openMiniCart, setOpenMiniCart] = useState(false);
  const handleCloseMiniCart = () => {
    setOpenMiniCart(false);
  };

  const useStyles = makeStyles((theme) => ({
    container: {
      maxWidth: '1200px',
      width: '100%',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    btnCart: {
      backgroundColor: 'transparent',
      margin: '0',
      padding: '0',
      border: 'none',
    },
    dialogMiniCart: {
      display: 'block',
      '& .MuiDialog-container ': {
        position: 'relative',
        justifyContent: 'flex-end',
        '& .MuiPaper-root': {
          width: 'max(60vw, min(100vw, (calc((768px - 100vw)*99999))))',
          margin: '0',
          maxHeight: '100vh',
          height: '100vh',
          border: 'none',
          borderRadius: '0',
          maxWidth: '610px',
          animation: `${
            openMiniCart ? '$dialogAnimation' : '$dialogAnimationExit'
          } 0.5s ease-in-out`,
          '& .MuiDialogContent-root ': {
            overFlow: 'hidden',
            padding: '0',
            overflowY: 'hidden',
          },
        },
      },
    },
    '@keyframes dialogAnimation': {
      '0%': {
        opacity: '0',
        transform: 'translateX(100%)',
      },
      '100%': {
        opacity: '1',
        transform: 'translateX(0%)',
      },
    },
    '@keyframes dialogAnimationExit': {
      '0%': {
        opacity: '1',
        transform: 'translateX(0%)',
      },
      '100%': {
        opacity: '0',
        transform: 'translateX(100%)',
      },
    },
  }));
  const classes = useStyles();

  const countItems = useSelector(cartItemsCountSelector);

  return (
    <div>
      <div onClick={() => setOpenMiniCart(!openMiniCart)} className={classes.btnCart}>
        <IconButton sx={{ color: 'black' }}>
          <Badge badgeContent={countItems} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </div>
      {/* Mini cart */}
      <Dialog
        className={classes.dialogMiniCart}
        open={openMiniCart}
        disableScrollLock={true}
        onClose={handleCloseMiniCart}
      >
        <DialogContent className={classes.dialogContent}>
          <MiniCart onCloseMiniCart={handleCloseMiniCart} />
        </DialogContent>
      </Dialog>
      {/* Navbar mobile */}
    </div>
  );
}

export default BadgeCart;
