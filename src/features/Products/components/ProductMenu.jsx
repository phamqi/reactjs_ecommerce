import { Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { NavLink } from 'react-router-dom';

ProductMenu.propTypes = {};
const useStyles = makeStyles((theme) => ({
  root: {
    '&> div': {
      display: 'flex',
      justifyContent: 'space-around',
      '&> div > a': {
        margin: '0.5rem',
        textDecoration: 'none',
        fontSize: '1.3rem',
        wordSpacing: '-2px',
        color: 'black',
      },
    },
  },
}));
function ProductMenu(props) {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Container className={classes.root}>
        <Box>
          <NavLink to="">Description</NavLink>
          <NavLink to="reviews">Review</NavLink>
        </Box>
      </Container>
    </Box>
  );
}

export default ProductMenu;
