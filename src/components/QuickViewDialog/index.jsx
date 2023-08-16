import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogContent, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';

import AddToCartForm from '../../components/form-control/addToCart';
import { addToCart } from '../../features/Cart/cartSlice';
import ProductInfo from './ProductInfo';
import ProductThumbnail from './ProductThumbnail';

QuickViewDialog.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    top: '50%',
    right: 10,
    zIndex: 1,
  },
  'div.MuiFormControl-root': {
    margin: 0,
  },
  container: {
    maxWidth: '1200px',
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  dialogQuickView: {
    display: 'block',
    '& .MuiDialog-container ': {
      position: 'relative',
      justifyContent: 'center',
      '& .MuiPaper-root': {
        width: 'max(80vw, min(100vw, (calc((600px - 100vw)*99999))))',
        margin: '0 15px',
        height: 'fit-content',
        border: 'none',
        borderRadius: '8px',
        maxWidth: '900px',
        '& .MuiDialogContent-root': {
          padding: '1.7rem',
          paddingTop: '0.7rem',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      },
    },
  },
  handleQuickView: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  btnCloseQuickView: {
    margin: '0',
    padding: '0',
    border: 'none',
    borderRadius: '20px',
    color: '#333',
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    '&:hover': {
      color: '#717fe0',
    },
    '& svg': {
      fontSize: '2rem',
    },
  },
  pagination: {
    '& > ul > li > .MuiPaginationItem-root.Mui-selected': {
      backgroundColor: '#717fe0',
    },
  },
}));
function QuickViewDialog({ dialogState, product, handleCloseQuickView }) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const handleAddToCartSubmit = async (values) => {
    try {
      const action = addToCart({
        id: product.id,
        product: product,
        quantity: values.quantity,
      });
      await dispatch(action);
      enqueueSnackbar('Item added to cart', { variant: 'success' });
    } catch (error) {}
  };
  return (
    <Dialog
      className={classes.dialogQuickView}
      open={!!dialogState}
      disableScrollLock={true}
      onClose={handleCloseQuickView}
    >
      <DialogContent className={classes.dialogContent}>
        <div className={classes.handleQuickView}>
          <button onClick={handleCloseQuickView} className={classes.btnCloseQuickView}>
            <CloseIcon />
          </button>
        </div>
        <Grid container>
          <Grid item xs={12} sm={6} md={5} lg={5}>
            <ProductThumbnail product={product} />
          </Grid>
          <Grid item xs={12} sm={6} md={7} lg={7}>
            <ProductInfo product={product} />
            <AddToCartForm onSubmit={handleAddToCartSubmit} />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default QuickViewDialog;
