import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import ByCategory from './ByCategory';
import ByPrice from './ByPrice';
import ByService from './ByService';

ProductFilters.propTypes = {
  filters: PropTypes.object,
  onChange: PropTypes.func,
};
function ProductFilters({ filters, onChange }) {
  const handlePriceChange = (values) => {
    if (onChange) {
      const newPriceChange = {
        ...values,
        _page: 1,
      };
      onChange(newPriceChange);
    }
  };
  const handleServiceChange = (values) => {
    if (onChange) {
      const newServiceChange = {
        ...values,
        _page: 1,
      };
      onChange(newServiceChange);
    }
  };
  const handleCategoryChange = (newCategoryId) => {
    if (!Object.values(filters).includes(`${newCategoryId}`)) {
      const newFilters = {
        'category.id': newCategoryId,
        _page: 1,
      };
      onChange(newFilters);
    }
    if (Object.values(filters).includes(`${newCategoryId}`)) {
      delete filters['category.id'];
      onChange(filters);
    }
  };

  return (
    <div>
      <Box sx={{ px: 3, pt: 2 }}>
        <ByCategory onChange={handleCategoryChange} />
        <ByPrice onChange={handlePriceChange} />
        <ByService filters={filters} onChange={handleServiceChange} />
      </Box>
    </div>
  );
}

export default ProductFilters;
