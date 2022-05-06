import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import categoryApi from '../../../../api/categoryApi';
import { makeStyles } from '@mui/styles';

ByCategory.propTypes = {
  onChange: PropTypes.func,
};
const useStyles = makeStyles((theme) => ({
  brli: {
    margin: '5px 0',
    color: 'rgba(0,0,0,0.6)',
    padding: '3px 0',
  },
  activeLi: {
    fontWeight: '600',
    color: 'rgb(0,0,0)',
    margin: '8px 0',
    padding: '3px 0',
  },
  brh4: {
    margin: '0 0 8px 0',
  },
}));
function ByCategory({ onChange }) {
  const classes = useStyles();
  const [categoryList, setCategoryList] = useState([]);
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
      } catch (error) {
        console.log('Loi~', error);
      }
    })();
  }, []);
  const [activeLi, setActiveLi] = useState();
  const [toggle, setToggle] = useState(false);

  const handleCategoryClick = (category) => {
    setToggle(!toggle);
    if (onChange) {
      onChange(category.id);
    }
  };
  return (
    <div>
      <Box className={classes.root}>
        <h4 className={classes.brh4}>Category</h4>
        <ul className={classes.brul}>
          {categoryList.map((category) => (
            <li
              key={category.id}
              onClick={() => {
                handleCategoryClick(category);
                setActiveLi(category.id);
              }}
              className={
                toggle && activeLi === category.id ? classes.activeLi : classes.brli
              }
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
