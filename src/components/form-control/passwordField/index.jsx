import React from 'react';
import PropTypes from 'prop-types';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import { Controller } from 'react-hook-form';
import { useState } from 'react';
import { FormHelperText, OutlinedInput } from '@mui/material';

PasswordField.propTypes = {
  name: PropTypes.string.isRequired,
  form: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
};

function PasswordField(props) {
  const { form, name, label } = props;
  const { errors } = form;
  const hasError = errors[name];
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword((x) => !x);
  };
  return (
    <div>
      <FormControl size="small" fullWidth variant="outlined">
        <InputLabel htmlFor={name}>{label}</InputLabel>
        <Controller
          error={!!hasError}
          name={name}
          id={name}
          control={form.control}
          as={OutlinedInput}
          label={label}
          fullWidth
          type={showPassword ? 'text' : 'password'}
          autoComplete="on"
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
        <FormHelperText>{errors[name]?.message}</FormHelperText>
      </FormControl>
    </div>
  );
}

export default PasswordField;
