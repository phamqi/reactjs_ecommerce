import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, TextField, Button } from '@mui/material';
import { BG_COLOR } from '../../../../constants';

ByPrice.propTypes = {
  onChange: PropTypes.func,
};

function ByPrice({ onChange }) {
  const [values, setValues] = useState({ salePrice_gte: 0, salePrice_lte: 0 });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(value);
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
        <Button
          sx={{
            background: `${BG_COLOR}`,
            mb: 2,
            mt: '10px',
            color: 'white',
          }}
          fullWidth
          onClick={handleSubmit}
        >
          Ap dung
        </Button>
      </Box>
    </div>
  );
}

export default ByPrice;
