import { Box, Skeleton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';

import { useCategoryList } from '../../../hook';

ByCategory.propTypes = {
  onChange: PropTypes.func,
};
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  ul: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    '&> span': {
      margin: '0.2rem 0.5rem',
      padding: '0.2rem 0.5rem',
    },
  },
  li: {
    color: '#888',
    cursor: 'pointer',
    marginRight: '16px',
    padding: '16px 0',
    '&:hover': {
      textDecoration: 'underline',
      color: '#717fe0',
    },
  },
  activeLi: {
    color: '#717fe0',
    textDecoration: 'underline',
    cursor: 'default',
    marginRight: '16px',
    padding: '16px 0',
  },
  h4: {
    margin: '0 0 8px 0',
  },
}));
function ByCategory({ onChange }) {
  const classes = useStyles();
  const { categoryList, categoryOnLoad } = useCategoryList();
  const [activeLi, setActiveLi] = useState();

  var skeletons = [];
  for (var i = 0; i < 10; i++) {
    var j = Math.floor(Math.random() * (100 - 50) + 50) + 'px';
    skeletons.push(<Skeleton key={i} width={j} />);
  }
  const location = useLocation();
  useEffect(() => {
    const params = queryString.parse(location.search);
    const urlCategoryID = params['category.id'];
    setActiveLi(parseInt(urlCategoryID));
  }, [location.search]);
  const handleCategoryClick = (category) => {
    if (onChange) {
      onChange(category.id);
    }
  };
  return (
    <Box className={classes.root}>
      <h3 className={classes.h4}>Category</h3>
      <ul className={classes.ul}>
        {categoryOnLoad
          ? skeletons
          : categoryList.map((category) => (
              <li
                key={category.id}
                onClick={() => {
                  handleCategoryClick(category);
                }}
                className={activeLi === category.id ? classes.activeLi : classes.li}
              >
                {category.name}
              </li>
            ))}
      </ul>
    </Box>
  );
}

export default ByCategory;
