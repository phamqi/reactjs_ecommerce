import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import KeyboardBackspaceSharpIcon from '@mui/icons-material/KeyboardBackspaceSharp';

EmptyCart.propTypes = {};

function EmptyCart(props) {
  return (
    <div>
      Empty Cart
      <Link to="/">
        <KeyboardBackspaceSharpIcon /> Back to Shop
      </Link>
    </div>
  );
}

export default EmptyCart;
