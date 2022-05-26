import { Checkbox, Box, FormControlLabel } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

ByService.propTypes = {
  filters: PropTypes.object,
  onChange: PropTypes.func,
};

function ByService({ filters = {}, onChange }) {
  const handleChange = (e) => {
    if (onChange) {
      const { name, checked } = e.target;
      onChange({ [name]: checked });
    }
  };
  return (
    <div>
      <Box>
        <ul>
          {[
            { value: 'isPromotion', label: 'Sale' },
            { value: 'isFreeShip', label: 'FreeShip' },
          ].map((service) => (
            <li key={service.value}>
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    checked={Boolean(filters[service.value])}
                    onChange={handleChange}
                    name={service.value}
                  />
                }
                label={service.label}
              />
            </li>
          ))}
        </ul>
      </Box>
    </div>
  );
}

export default ByService;
