import { Box, Button, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import { useState } from 'react';

ByPrice.propTypes = {
  onChange: PropTypes.func,
};
const useStyles = makeStyles((theme) => ({
  btnPrice: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    cursor: 'pointer',
    userSelect: 'none',
    verticalAlign: 'middle',
    textDecoration: 'none',
    fontWeight: 500,
    fontSize: '0.875rem',
    lineHeight: '1.75',
    letterSpacing: '0.02857em',
    textTransform: 'uppercase',
    minWidth: '64px',
    padding: '6px 8px',
    borderRadius: '8px',
    width: '100%',
    backgroundColor: '#333',
    margin: '10px 0 20px',
    color: '#fff',
    border: 'none',
    '&:hover': {
      backgroundColor: '#717fe0',
    },
  },
}));
function ByPrice({ onChange }) {
  const [values, setValues] = useState({ salePrice_gte: 0, salePrice_lte: 0 });
  const classes = useStyles();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handleSubmit = () => {
    if (onChange) onChange(values);
  };
  return (
    <div>
      <Box>
        <h4 style={{ margin: '10px 0 10px 0' }}>Khoang gia</h4>
        <TextField
          size="small"
          name="salePrice_gte"
          onChange={handleChange}
          value={values.salePrice_gte}
        />
        <TextField
          size="small"
          name="salePrice_lte"
          onChange={handleChange}
          value={values.salePrice_lte}
        />
        <button onClick={handleSubmit} className={classes.btnPrice}>
          Ap dung
        </button>
      </Box>
    </div>
  );
}

export default ByPrice;
