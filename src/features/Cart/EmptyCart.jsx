import KeyboardBackspaceSharpIcon from '@mui/icons-material/KeyboardBackspaceSharp';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import { IMG_EMPTY_CART } from '../../constants';

EmptyCart.propTypes = {};
const useStyles = makeStyles((theme) => ({
  root: {},
  divImg: {
    height: '50vh',
    minHeight: '200px',
    width: '100vw',
    maxWidth: '1200px',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
  },
  divLink: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& a': {
      marginLeft: '7px',
      textDecoration: 'underline',
    },
  },
}));
function EmptyCart(props) {
  const classes = useStyles();
  return (
    <div>
      <div
        className={classes.divImg}
        style={{ backgroundImage: `url('${IMG_EMPTY_CART}')` }}
      ></div>
      <div className={classes.divLink}>
        <KeyboardBackspaceSharpIcon />
        <Link to="/">Start Shopping</Link>
      </div>
    </div>
  );
}

export default EmptyCart;
