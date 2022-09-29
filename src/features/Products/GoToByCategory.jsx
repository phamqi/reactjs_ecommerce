import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { useLocation, useNavigate } from 'react-router-dom';

GoToByCategory.propTypes = {
  onChange: PropTypes.func,
  categoryList: PropTypes.array,
  categoryOnLoad: PropTypes.bool,
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
    cursor: 'pointer',
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
function GoToByCategory({ categoryList, categoryOnLoad }) {
  const location = useLocation();
  const navigate = useNavigate();
  const classes = useStyles();
  const filter = {
    _page: Number.parseInt(1),
    _limit: Number.parseInt(12),
    _sort: 'created_at:ASC',
    isFreeShip: 'false',
    isPromotion: 'false',
  };
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
        {categoryOnLoad ? (
          <h1>Loading</h1>
        ) : (
          categoryList.map((category) => (
            <p
              key={category.id}
              onClick={() => {
                handleCategoryClick(category);
              }}
              className={classes.a}
            >
              {category.name}
            </p>
          ))
        )}
      </Box>
    </Box>
  );
}
export default GoToByCategory;
