import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Button, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IMG_URL, STATIC_HOST } from '../../constants/index';
import { addToCart } from './cartSlice';
CartItem.propTypes = {};
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'white',
    margin: '1rem 0 0 0',
    display: 'flex',
    borderRadius: 'max(0px, min(5px, calc((100vw - 600px) * 99999)))',
    borderBottom: '1px solid rgba(0,0,0,0.2)',
    overflow: 'hidden',
    position: 'relative',
    marginLeft: 'max(0px, min(1rem, calc((900px - 100vw ) * 99999)))',
  },
  imgCart: {
    width: '85px',
    height: '85px',
    objectFit: 'cover',
  },
  inforTop: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    zIndex: '1',
    alignItems: 'center',
    transition: 'all 0.5s linear',
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  inforTopActive: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    zIndex: '1',
    transform: 'translateX(-10rem)',
    alignItems: 'center',
    justifyContent: 'space-between',
    transition: 'all 0.5s linear',
    backgroundColor: 'white',
  },
  inforCart: {
    transition: 'all 0.5s linear',
    backgroundColor: 'white',
    zIndex: '1',
    width: '100%',
    display: 'flex',
    padding: '10px',
    justifyContent: 'space-between',
  },
  control: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlQuantity: {
    display: 'flex',
    alignItems: 'center',
    '& > input': {
      fontSize: '1rem',
      padding: '0px',
      textAlign: 'center',
      width: '30px',
      border: '1px solid rgba(0,0,0,0.2)',
      height: '30px',
    },
    '& > button': {
      backgroundColor: 'white',
      width: '32px',
      height: '32px',
      padding: '0',
      border: '1px solid rgba(0,0,0,0.2)',
      borderRadius: '3px',
    },
  },
  price: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontSize: '1rem',
    color: '#ee4d2d',
    fontWeight: '500',
  },
  infor: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '75px',
    '& > $name': {
      minHeight: '34px',
      color: 'black',
      textDecoration: 'none',
      fontSize: '0.9rem',
      display: 'inline-block',
      wordWrap: 'break-word',
      whiteSpace: 'normal',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      lineHeight: '17px',
      '-webkit-box-orient': 'vertical',
      '-webkit-line-clamp': '2',
    },
  },
  btnOption: {
    '& > button > svg': {
      fontSize: '1rem',
      color: 'black',
      backgroundColor: 'white',
      '&:hover': {
        color: 'red',
        fontSize: '1.05rem',
      },
    },
  },
  divOption: {
    width: '10rem',
    marginRight: 'max(0px, min(1rem, calc((100vw - 899px) * 99999)))',
    textAlign: 'center',
    right: '0',
    top: '0',
    bottom: '0',
    display: 'flex',
    justifyContent: 'space-around',
    '& > a': {
      textDecoration: 'none',
    },
    '& button': {
      textTransform: 'none',
      borderRadius: '0',
      width: '100%',
      '&:hover': {
        color: 'black',
      },
    },
  },
  iconActive: {
    transform: 'rotate(180deg)',
    transition: 'all 0.3s linear',
  },
}));

function CartItem({ item, handleChange }) {
  const classes = useStyles();

  const handleDecreaseOnCart = async (item) => {
    handleChange(item, 3);
  };
  const handleAddToCart = async (item) => {
    handleChange(item, 2);
  };

  const handleRemove = async (item) => {
    handleChange(item, 1);
  };
  const onChange = () => {};
  const navigate = useNavigate();
  const handleProductClick = () => {
    navigate(`/${item.product.name}_i${item.product.id}`);
    window.scrollTo(0, 0);
  };
  const [activeDiv, setActiveDiv] = useState();
  const [toggle, setToggle] = useState(false);
  var startX, moveX;
  const handelMoveStart = (e) => {
    startX = e.touches[0].clientX;
  };
  const handelMove = (e) => {
    moveX = e.touches[0].clientX;
  };

  return (
    <div
      className={classes.root}
      onTouchStart={handelMoveStart}
      onTouchMove={handelMove}
      onTouchEnd={(e) => {
        if (startX - 30 > moveX) {
          setActiveDiv(item.id);
          setToggle(true);
        }
        if (startX + 30 < moveX) {
          setActiveDiv(item.id);
          setToggle(false);
        }
      }}
    >
      <Box>
        <img
          className={classes.imgCart}
          src={`${
            item.product.thumbnail ? STATIC_HOST + item.product.thumbnail?.url : IMG_URL
          }`}
          alt={`${item.product.name}`}
        ></img>
      </Box>
      <Box
        className={
          toggle && activeDiv === item.id ? classes.inforTopActive : classes.inforTop
        }
      >
        <Box
          className={classes.inforCart}
          sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
        >
          <Box className={classes.infor}>
            <p className={classes.name} onClick={() => handleProductClick()}>
              {item.product.name}
            </p>
            <p className={classes.price}>{item.product.salePrice}</p>
          </Box>
          <Box
            sx={{ justifyContent: { xs: 'space-between', sm: '' } }}
            className={classes.control}
          >
            <Box className={classes.controlQuantity}>
              <IconButton
                className={classes.button}
                onClick={() => handleDecreaseOnCart(item)}
              >
                <ExpandMoreIcon />
              </IconButton>
              <input
                width="100px"
                type="number"
                name="quantity"
                value={item.quantity}
                onChange={() => onChange()}
              />
              <IconButton
                className={classes.button}
                onClick={() => handleAddToCart(item)}
              >
                <ExpandLessIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{ visibility: { xs: 'visible', sm: 'visible', md: 'hidden' } }}
          className={classes.btnOption}
        >
          <Button
            onClick={() => {
              setActiveDiv(item.id);
              setToggle(!toggle);
            }}
          >
            <ArrowBackIosIcon
              className={
                toggle && activeDiv === item.id ? classes.iconActive : classes.icon
              }
            />
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          position: { xs: 'absolute', sm: 'absolute', md: 'relative' },
          flexDirection: { xs: 'row ', sm: 'row', md: 'column' },
        }}
        className={classes.divOption}
      >
        <Button
          sx={{
            color: { xs: 'white', sm: 'white', md: 'rgb(73,125,189)' },
            backgroundColor: {
              xs: 'rgb(73,125,189)',
              sm: 'rgb(73,125,189)',
              md: 'transparent',
            },
          }}
          onClick={() => {}}
        >
          Related
        </Button>
        <Button
          sx={{
            color: { xs: 'white', sm: 'white', md: 'red' },
            backgroundColor: {
              xs: '#ee4d2d',
              sm: '#ee4d2d',
              md: 'transparent',
            },
          }}
          onClick={() => {
            handleRemove(item);
          }}
        >
          Remove
        </Button>
      </Box>
    </div>
  );
}

export default CartItem;
