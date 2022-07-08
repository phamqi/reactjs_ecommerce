import { yupResolver } from '@hookform/resolvers/yup';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PinterestIcon from '@mui/icons-material/Pinterest';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Box, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import InputField from '../../components/form-control/inputField';

Footer.propTypes = {};
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: 'white',
    marginTop: '1rem',
  },
  content: {
    display: 'flex',
    marginTop: '1rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '1200px',
    width: '100%',
    textAlign: 'center',
  },
  subscribeFrom: {
    width: '70%',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    alignItems: 'center',
    '& .subscribeBtn': {
      backgroundColor: 'black',
      color: 'white',
      height: '42px',
      boxSizing: 'border-box',
      '&:hover': {
        color: 'white',
        backgroundColor: '#717fe0',
      },
    },
    '& input': {
      height: '32px',
      padding: '5px',
      paddingLeft: '15px',
      fontSize: '1rem',
      // minWidth: '333px',
    },
  },
}));
function Footer(props) {
  const schema = yup.object().shape({
    email: yup.string().required('Please enter your email').email('Please enter a email'),
  });
  const handleSubmit = () => {};
  const form = useForm({
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(schema),
  });
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box
        className={classes.content}
        sx={{ flexDirection: { xs: 'column-reverse', sm: 'column' } }}
      >
        <Box>
          <h3>Newletter Subscription</h3>
          <p>
            Sing up for Code update to receive information about feature events and
            specials
          </p>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <Box
              className={classes.subscribeFrom}
              sx={{ flexWrap: { xs: 'wrap', sm: 'nowrap' } }}
            >
              <InputField
                className="subscribeInput"
                name="email"
                label=""
                form={form}
                placeholder="Enter your email address"
              />
              <Button sx={{ width: { xs: '100%', sm: '25%' } }} className="subscribeBtn">
                Subscribe
              </Button>
            </Box>
          </form>
        </Box>
        <Box>
          <Box>
            <YouTubeIcon /> <FacebookOutlinedIcon /> <LinkedInIcon /> <InstagramIcon />
            <PinterestIcon />
          </Box>
          <Box>
            <p>
              <span>&#169;</span> 2022 Code. All rights reserved
            </p>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;
