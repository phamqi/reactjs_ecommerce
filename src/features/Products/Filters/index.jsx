import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import ByCategory from './ByCategory';
import ByService from './ByService';
import Sort from './Sort';
ProductFilters.propTypes = {
  filters: PropTypes.object,
  onChange: PropTypes.func,
};
function ProductFilters({ filters, onChange, handleSortChange }) {
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
    <Box sx={{ px: 3, pt: 2 }}>
      <ByCategory onChange={handleCategoryChange} />
      <Sort onChange={handleSortChange} currentSort={filters._sort} />
      <ByService filters={filters} onChange={handleServiceChange} />
    </Box>
  );
}

export default ProductFilters;
