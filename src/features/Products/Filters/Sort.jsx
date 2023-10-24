import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabUnstyled from '@mui/base/TabUnstyled';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';

import { LIST_SORT } from '../../../constants';

const useStyles = makeStyles((theme) => ({
  root: {},
  tab_list: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
  title: {
    margin: '0 0 8px 0',
  },
  list_item: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  item: {
    border: 'none',
    color: '#888',
    backgroundColor: 'transparent',
    fontSize: '1rem',
    display: 'flex',
    textTransform: 'capitalize',
    padding: '16px 0',
    marginRight: '16px',
    '&.item-selected': {
      color: '#717fe0',
      textDecoration: 'underline',
    },
  },
}));
Sort.propTypes = {
  currentSort: PropTypes.string,
  handleSortChange: PropTypes.func,
};

function Sort({ currentSort, onChange }) {
  const classes = useStyles();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState();
  useEffect(() => {
    const params = queryString.parse(location.search);
    const urlSort = params['_sort'];
    setActiveItem(urlSort);
  }, [location.search]);
  const handleSortChange = (e, newSort) => {
    if (onChange) onChange(newSort);
  };
  return (
    <TabsUnstyled
      className={classes.root}
      defaultValue=""
      value={currentSort}
      onChange={handleSortChange}
    >
      <TabsListUnstyled className={classes.tab_list}>
        {!!LIST_SORT ? (
          <div>
            <h3 className={classes.title}>Sort by</h3>
            <div className={classes.list_item}>
              {LIST_SORT.map((item) => (
                <TabUnstyled
                  key={item.value}
                  className={
                    activeItem === item.value
                      ? classes.item + ' item-selected'
                      : classes.item
                  }
                  value={item && item.value}
                >
                  {item && item.text}
                </TabUnstyled>
              ))}
            </div>
          </div>
        ) : (
          ' '
        )}
      </TabsListUnstyled>
      <TabPanelUnstyled value={4}>First content</TabPanelUnstyled>
    </TabsUnstyled>
  );
}

export default Sort;
