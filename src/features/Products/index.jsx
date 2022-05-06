import { Box } from '@mui/material';
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from '../Header';
import Slide from '../Slide';
import DetailPage from './pages/DetailPage';
import ListPage from './pages/ListPage';

ProductFeature.propTypes = {};

function ProductFeature(props) {
  return (
    <Box>
      <Header />
      <Box>
        <Slide />
      </Box>
      <Routes>
        <Route exact path="/" element={<ListPage />}>
          <Route path="/:productId/*" element={<DetailPage />} />
        </Route>
      </Routes>
    </Box>
  );
}

export default ProductFeature;
