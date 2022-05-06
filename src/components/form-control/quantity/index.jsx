import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, FormHelperText, IconButton, OutlinedInput } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';

QuantityField.propTypes = {
  name: PropTypes.string.isRequired,
  form: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
};

function QuantityField(props) {
  const { form, name } = props;
  const { errors, setValue } = form;
  const hasErrors = errors[name];
  return (
    <div>
      <FormControl size="small" fullWidth variant="outlined">
        <Controller
          name={name}
          control={form.control}
          render={({ onChange, onBlur, name, value }) => (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                onClick={() =>
                  setValue(name, Number.parseInt(value) ? Number.parseInt(value) - 1 : 0)
                }
              >
                <ExpandMoreIcon />
              </IconButton>
              <OutlinedInput
                name={name}
                value={value}
                id={name}
                type="number"
                onChange={onChange}
                onBlur={onBlur}
                error={!!hasErrors}
              />
              <IconButton
                onClick={() =>
                  setValue(name, Number.parseInt(value) ? Number.parseInt(value) + 1 : 1)
                }
              >
                <ExpandLessIcon />
              </IconButton>
            </Box>
          )}
        />
        <FormHelperText>{errors[name]?.message}</FormHelperText>
      </FormControl>
    </div>
  );
}

export default QuantityField;
