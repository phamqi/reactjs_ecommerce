// import React from 'react';
// import PropTypes from 'prop-types';
// import { Box } from '@mui/material';
// import ByCategory from './Filters/ByCategory';
// import ByPrice from './Filters/ByPrice';
// import ByService from './Filters/ByService';
// import { makeStyles } from '@mui/styles';

// ProductFilters.propTypes = {
//   filters: PropTypes.object,
//   onChange: PropTypes.func,
// };
// const useStyles = makeStyles((theme) => ({
//   root: {},
// }));
// function ProductFilters({ filters, onChange }) {
//   const handlePriceChange = (values) => {
//     if (onChange) {
//       const newPriceChange = {
//         ...values,
//         _page: 1,
//       };
//       onChange(newPriceChange);
//     }
//   };
//   const handleServiceChange = (values) => {
//     if (onChange) {
//       const newServiceChange = {
//         ...values,
//         _page: 1,
//       };
//       onChange(newServiceChange);
//     }
//   };
//   const handleCategoryChange = (newCategoryId) => {
//     if (!Object.values(filters).includes(`${newCategoryId}`)) {
//       const newFilters = {
//         'category.id': newCategoryId,
//         _page: 1,
//       };
//       onChange(newFilters);
//     }
//     if (Object.values(filters).includes(`${newCategoryId}`)) {
//       delete filters['category.id'];
//       onChange(filters);
//     }
//   };
//   return (
//     <div>
//       <Box sx={{ px: 2, pt: 1 }}>
//         <ByCategory onChange={handleCategoryChange} />
//         <ByPrice onChange={handlePriceChange} />
//         <ByService filters={filters} onChange={handleServiceChange} />
//       </Box>
//     </div>
//   );
// }

// export default ProductFilters;
