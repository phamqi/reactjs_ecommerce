import { yupResolver } from '@hookform/resolvers/yup';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PinterestIcon from '@mui/icons-material/Pinterest';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Box, Button, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import InputField from '../../components/form-control/inputField';
import { TEL } from '../../constants';
import { useCategoryList } from '../../hook';

Footer.propTypes = {};
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: '#222',
    padding: '4rem 0 3rem 0',
  },
  container: {
    maxWidth: '1200px',
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  item: {
    padding: '0 16px',
    boxSizing: 'border-box',
    '& ul': {},
    '& h4': {
      fontSize: '1.1rem',
      fontWeight: '500',
      color: '#fff',
      textTransform: 'uppercase',
    },
    '& li': {
      color: '#b2b2b2',
      fontSize: '0.9rem',
      lineHeight: '1.9',
      textTransform: 'capitalize',
      boxSizing: 'border-box',
    },
    '& li.notCapitalize': {
      textTransform: 'none',
      '& a': {
        color: '#d2d2d2',
        '&:visited': {
          color: '#d2d2d2',
        },
        '&:hover': {
          color: '#717fe0',
        },
      },
    },
    '& .input-focus': {
      width: '0',
      height: '2px',
      backgroundColor: '#6774d5',
      transition: 'all 0.5s',
    },
  },
  link: {
    padding: '5px',
    margin: '0 5px',
    '&:hover': {
      color: '#717fe0',
    },
  },
  textBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    width: '100%',
    padding: '1rem',
    marginTop: '2rem',
  },
  textCopyright: {
    color: '#888',
  },
  btnSubscribe: {
    fontSize: '0.9rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    backgroundColor: '#717fe0',
    color: '#fff',
    padding: '0.7rem 1rem',
    borderRadius: '23px',
    border: 'none',
    marginTop: '1.5rem',
    boxSizing: 'border-box',
    '&:hover': {
      color: '#717fe0',
      backgroundColor: '#fff',
    },
  },
  emailInput: {
    color: '#fff',
    border: 'none',
    lineHeight: '1.9',
    fontSize: '0.9rem',
    backgroundColor: 'transparent',
    outline: 'none',
    '&:focus + .input-focus': {
      width: '100%',
    },
  },
}));
function Footer(props) {
  const classes = useStyles();
  const { categoryList, categoryOnLoad } = useCategoryList();
  return (
    <Box className={classes.root}>
      <Box className={classes.container}>
        <Box className={classes.content}>
          <Grid container sx={{ width: '100%' }}>
            <Grid item xs={12} sm={6} md={3} lg={3} className={classes.item}>
              <h4>CATEGORIES</h4>
              <ul>
                {!categoryOnLoad && categoryList
                  ? categoryList.map((item) => <li key={item.id}>{item.name}</li>)
                  : Array.from(Array(5)).map((item, index) => (
                      <li key={index}>Loading...</li>
                    ))}
              </ul>
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3} className={classes.item}>
              <h4>HELP</h4>
              <ul>
                <li>Track Order</li>
                <li>Returns</li>
                <li>Shipping</li>
                <li>FAQs</li>
              </ul>
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3} className={classes.item}>
              <h4>GET IN TOUCH</h4>
              <ul>
                <li className="notCapitalize">
                  Any questions? Let us know in store at 8th floor, 379 Hudson St, New
                  York, NY 10018 or call us on :
                  <a href={`tel:+${TEL.zone + TEL.number}`}>
                    (+{TEL.zone}){TEL.number}
                  </a>
                </li>
                <li>
                  <Box sx={{ padding: '1rem 0' }}>
                    <a className={classes.link} href="/">
                      <PinterestIcon />
                    </a>
                    <a className={classes.link} href="/">
                      <FacebookOutlinedIcon />
                    </a>
                    <a className={classes.link} href="/">
                      <InstagramIcon />
                    </a>
                  </Box>
                </li>
              </ul>
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3} className={classes.item}>
              <h4>NEWSLETTER</h4>
              <ul>
                <li>
                  <input
                    className={classes.emailInput}
                    placeholder="email@example.com"
                  ></input>
                  <div className="input-focus"></div>
                </li>
                <li>
                  <button className={classes.btnSubscribe}>subscribe</button>
                </li>
              </ul>
            </Grid>
          </Grid>
        </Box>
        <Box className={classes.textBox}>
          <p className={classes.textCopyright}>
            <span>&#169;</span> 2022 Code. All rights reserved
          </p>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;
