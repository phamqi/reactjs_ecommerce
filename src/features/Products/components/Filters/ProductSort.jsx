import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabUnstyled from '@mui/base/TabUnstyled';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';

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
    fontSize: '1rem',
    display: 'flex',
    '&.Mui-selected': {
      color: 'rgb(0,0,0)',
    },
  },
  item_box: {
    display: 'flex',
  },
  item_text: {
    '& p': {
      fontSize: '10px',
      margin: '0',
      padding: '0',
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
            Sort by:
            <TabUnstyled className={classes.item} value="name:ASC">
              Name
              <div className={classes.item_box}>
                <div className={classes.item_text}>
                  <p>A</p>
                </div>
                <span>&#8595;</span>
              </div>
            </TabUnstyled>
            <TabUnstyled className={classes.item} value="created_at:ASC">
              New
            </TabUnstyled>
            <TabUnstyled className={classes.item} value="salePrice:DESC">
              Price
              <div className={classes.item_box}>
                <div className={classes.item_text}>
                  <p>$</p>
                </div>
                <span>&#8595;</span>
              </div>
            </TabUnstyled>
          </div>
        </TabsListUnstyled>
        <TabPanelUnstyled value={4}>First content</TabPanelUnstyled>
      </TabsUnstyled>
    </div>
  );
}

export default ProductSort;
