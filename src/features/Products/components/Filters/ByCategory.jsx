import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Skeleton, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import useCategoryList from '../../hook/useCategoryList';

ByCategory.propTypes = {
  onChange: PropTypes.func,
};
const useStyles = makeStyles((theme) => ({
  ul: {
    '&> span': {
      margin: '5px 0',
      padding: '3px 0',
    },
  },
  li: {
    margin: '5px 0',
    color: 'rgba(0,0,0,0.6)',
    padding: '3px 0',
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  activeLi: {
    margin: '5px 0',
    padding: '3px 0',
    fontWeight: '600',
    color: 'rgb(0,0,0)',
    cursor: 'pointer',
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
    var j = Math.floor(Math.random() * (100 - 50) + 50) + '%';
    skeletons.push(<Skeleton key={i} width={j} />);
  }
  const preActiveli = useRef(activeLi);

  useEffect(() => {
    preActiveli.current = activeLi;
  }, [activeLi]);

  const handleCategoryClick = (category) => {
    if (activeLi === category.id) {
      setActiveLi(null);
    } else {
      setActiveLi(category.id);
    }
    if (onChange) {
      onChange(category.id);
    }
  };
  return (
    <div>
      <Box className={classes.root}>
        <h4 className={classes.h4}>Category</h4>
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
    </div>
  );
}

export default ByCategory;
