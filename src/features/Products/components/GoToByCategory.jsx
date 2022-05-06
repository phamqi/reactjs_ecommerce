import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import categoryApi from '../../../api/categoryApi';
import { makeStyles } from '@mui/styles';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';

ByCategory.propTypes = {
  onChange: PropTypes.func,
};
const useStyles = makeStyles((theme) => ({
  root: {
    padding: '10px',
  },
  categoryBox: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  a: {
    margin: '2px 5px',
    color: 'black',
    padding: '3px',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  brh4: {
    margin: '0 0 8px 0',
  },
}));
function ByCategory() {
  const location = useLocation();
  const navigate = useNavigate();
  const classes = useStyles();
  const [categoryList, setCategoryList] = useState([]);
  const filter = {
    _page: Number.parseInt(1),
    _limit: Number.parseInt(12),
    _sort: 'created_at:ASC',
    isFreeShip: 'false',
    isPromotion: 'false',
  };
  useEffect(() => {
    (async () => {
      try {
        const list = await categoryApi.getAll();
        setCategoryList(
          list.map((x) => ({
            id: x.id,
            name: x.name,
          }))
        );
      } catch (error) {}
    })();
  }, []);
  const handleCategoryClick = (category) => {
    const newFilter = { ...filter, 'category.id': category.id };
    let locationSearch = {
      pathname: location.pathname,
      search: queryString.stringify(newFilter),
    };
    navigate(locationSearch);
  };
  return (
    <Box className={classes.root}>
      <h4 className={classes.brh4}>Category</h4>
      <Box className={classes.categoryBox}>
        {categoryList.map((category) => (
          <a
            href={`?${queryString.stringify({
              ...filter,
              'category.id': category.id,
            })}`}
            key={category.id}
            onClick={() => {
              handleCategoryClick(category);
            }}
            className={classes.a}
          >
            {category.name}
          </a>
        ))}
      </Box>
    </Box>
  );
}

export default ByCategory;
