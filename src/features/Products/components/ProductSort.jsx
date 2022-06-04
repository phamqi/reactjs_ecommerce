import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabUnstyled from '@mui/base/TabUnstyled';
import { makeStyles } from '@mui/styles';
import { height } from '@mui/system';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {},
  list: {
    margin: '1rem 5px',
    height: '40px',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
  },
  item: {
    border: 'none',
    color: 'rgba(0,0,0,0.5)',
    backgroundColor: 'transparent',
    fontSize: '1.1rem',
    marginRight: '1rem',
    padding: '1rem 1rem 2rem 0px',
    '&.Mui-selected': {
      color: 'rgb(0,0,0)',
    },
  },
}));
ProductSort.propTypes = {
  currentSort: PropTypes.string,
  handleSortChange: PropTypes.func,
};

function ProductSort({ currentSort, onChange }) {
  const classes = useStyles();
  const handleSortChange = (e, newSort) => {
    if (onChange) onChange(newSort);
  };
  return (
    <div>
      <TabsUnstyled
        className={classes.root}
        defaultValue="created_at:ASC"
        value={currentSort}
        onChange={handleSortChange}
      >
        <TabsListUnstyled className={classes.list}>
          <div className={classes.list}>
            <TabUnstyled className={classes.item} value="name:ASC">
              All
            </TabUnstyled>
            <TabUnstyled className={classes.item} value="created_at:ASC">
              Featured
            </TabUnstyled>
            <TabUnstyled className={classes.item} value="salePrice:DESC">
              Sale
            </TabUnstyled>
          </div>
        </TabsListUnstyled>
        <TabPanelUnstyled value={4}>First content</TabPanelUnstyled>
      </TabsUnstyled>
    </div>
  );
}

export default ProductSort;
