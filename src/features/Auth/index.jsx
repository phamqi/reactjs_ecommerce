import CloseIcon from '@mui/icons-material/Close';
import { Avatar } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import './styles.scss';
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiPaper-root': {
      margin: '0',
    },
  },
  option: {
    textAlign: 'center',
    cursor: 'pointer',
    margin: '1rem',
    fontSize: '1rem',
    '& > span': {
      textDecoration: 'underline',
      '&:hover': {
        textDecoration: 'none',
      },
    },
  },
}));
Auth.propTypes = {};
const MODE = {
  LOGIN: 'login',
  REGISTER: 'register',
};
function Auth({ openAuth, handleCloseAuth }) {
  const classes = useStyles();
  const [mode, setMode] = useState(MODE.LOGIN);

  const redirectLogin = () => {
    setMode(MODE.LOGIN);
  };
  const myOrigin = window.location.origin;
  return (
    <div className={classes.root}>
      <Dialog open={openAuth} disableScrollLock={true} onClose={handleCloseAuth}>
        <DialogContent
          sx={{
            maxWidth: '540px',
            width: { xs: '70vw', sm: '55vw', md: ' 25vw' },
            overflowY: 'hidden',
          }}
        >
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={handleCloseAuth}>
              <CloseIcon sx={{ color: 'black' }} />
            </Button>
          </Box>

          <div className="register__avatar">
            <img src={`${myOrigin}/logo.png`} />
          </div>

          {mode === MODE.LOGIN && (
            <>
              <Login />
              <Box className={classes.option}>
                <span onClick={() => setMode(MODE.REGISTER)}>Sign up</span>
              </Box>
            </>
          )}
          {mode === MODE.REGISTER && (
            <>
              <Register redirectLogin={redirectLogin} />
              <Box className={classes.option}>
                <span onClick={() => setMode(MODE.LOGIN)}>Sign in</span>
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Auth;
