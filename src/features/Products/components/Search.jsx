import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
Search.propTypes = {
  openSearch: PropTypes.bool,
};

function Search({ openSearch, props }) {
  const [open, setOpen] = useState(true);
  const handleChangeSearch = () => {
    setOpen(false);
  };
  return (
    <div>
      <Dialog open={openSearch && open} onClose={handleChangeSearch}>
        <DialogContent>
          <DialogContentText>
            <Button onClick={() => handleChangeSearch}>X</Button>
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Search"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default Search;
