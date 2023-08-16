import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { Button, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { memo, useState } from 'react';

import productApi from '../../api/productApi';
import { Product } from '../../components';

SearchBox.propTypes = {};
const useStyles = makeStyles((theme) => ({
  searchBox: {
    minWidth: '320px',
    boxSizing: 'border-box',
    borderRadius: '4px',
    position: 'absolute',
    overflowY: 'auto',
    overflowX: 'hidden',
    '&  input': {
      boxSizing: 'border-box',
      width: 'max(100%, min(30vw, calc((100vw - 600px) * 99999)))',
      fontSize: '1rem',
      padding: '5px 30px 5px 30px',
      height: '40px',
      borderRadius: '2px',
      border: 'none',
    },
    '&  input:focus': {
      outline: 'none',
    },
  },
  iconSearchOff: {
    textAlign: 'center',
    margin: '0',
    '& > svg': {
      color: 'rgba(128,128,128, 0.5)',
      fontSize: '3rem',
      marginTop: '20%',
    },
  },
  boxInput: {
    '&> button.btnCloseSearch': {
      position: 'absolute',
      top: '5px',
      right: '15px',
      height: '26px',
      margin: '3px',
      boxSizing: 'content-box',
      backgroundColor: 'transparent',
      minWidth: '35px',
      padding: '0',
      fontSize: '1rem',
      color: 'black',
      borderRadius: '2px',
    },
  },
  productBox: {
    height: 'min(100vh, max(70vh, calc((600px - 100vw)*99999)))',
    minHeight: '30vh',
    backgroundColor: 'rgba(255,255,255,0.8)',
    opacity: '1',
    overflowY: 'auto',
    overflowX: 'hidden',
    '&::-webkit-scrollbar': {
      width: '0.5rem',
    },
    '&::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.3)',
      backgroundColor: '#F5F5F5',
      borderRadius: '10px',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '10px',
      backgroundColor: '#888',
    },
    '& > div': {
      boxSizing: 'border-box',
      width: '90%',
      opacity: 1,
      padding: '15px',
      margin: '15px',
      background: 'white',
      borderRadius: '8px',
    },
  },
}));
function SearchBox(props) {
  const classes = useStyles();
  const [listSearch, setListSearch] = useState([]);
  const [loadSearch, setLoadSearch] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  const handelSearchClick = () => {
    setOpenSearch(true);
  };
  const handleChangeSearch = () => {
    setOpenSearch(false);
  };
  const onChangeSearch = (e) => {
    (async () => {
      try {
        const data = await productApi.search(e.target.value);
        setListSearch(data);
        setLoadSearch(true);
      } catch (error) {}
    })();
  };
  return (
    <Box sx={{ position: 'relative' }}>
      <IconButton
        onClick={handelSearchClick}
        aria-label="menu"
        sx={{ my: 1, mx: 1, px: 1, color: 'black' }}
      >
        <SearchIcon />
      </IconButton>
      {openSearch ? (
        <Box
          sx={{
            maxWidth: '420px',
            padding: '0',
            width: { xs: '100vw', sm: '40vw' },
            top: { xs: '10%', sm: '20%' },
            right: { xs: '0%', sm: '20%' },
          }}
          className={classes.searchBox}
        >
          <Box className={classes.boxInput}>
            <input
              type="text"
              onChange={(e) => onChangeSearch(e)}
              placeholder="Search..."
            />
            <Button className="btnCloseSearch" onClick={handleChangeSearch}>
              <CloseIcon />
            </Button>
          </Box>
          <Box>
            <Box className={classes.productBox}>
              {loadSearch ? (
                listSearch.map((item) => <Product product={item} />)
              ) : (
                <h2 className={classes.iconSearchOff}>
                  <SearchOffIcon />
                </h2>
              )}
            </Box>
            <Box sx={{ backgroundColor: 'white' }}></Box>
          </Box>
        </Box>
      ) : (
        ''
      )}
    </Box>
  );
}

export default memo(SearchBox);
