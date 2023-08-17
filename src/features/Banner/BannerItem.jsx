import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import { BTN_BANNER_TEXT } from '../../constants';
BannerItem.propTypes = {
  dataBanner: PropTypes.object,
};
const useStyles = makeStyles((theme) => ({
  banner_bg: {
    position: 'relative',
    width: '100%',
    height: '15rem',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid #e6e6e6',
    '&:hover': {
      color: 'white',
      backgroundColor: 'rgba(103,117,214,0.5)',
      backgroundBlendMode: 'darken',
      '& $btnLink': {
        color: 'white',
        transform: 'translateY(0)',
        transition: 'all 0.8s',
      },
      '& $textLink': {
        transition: 'all 0.5s',
        transform: 'scaleX(1)',
      },
    },
  },
  text: {
    display: 'flex',
    width: '70%',
    height: '70%',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  textChild: {
    display: 'flex',
    flexDirection: 'column',
  },
  textName: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    lineHeight: '1.3',
  },
  textInfo: {
    fontSize: '0.9rem',
    textTransform: 'capitalize',
  },
  textLink: {
    width: 'fit-content',
    transform: 'scaleX(0)',
    borderBottom: '2px solid white',
  },
  btnLink: {
    transform: 'translateY(300%)',
    textTransform: 'uppercase',
    padding: '0.7rem 0',
    color: 'white',
    '&:visited': {
      color: 'white',
    },
  },
  '@keyframes translateA': {
    '0%': {
      opacity: '0.3',
      transform: 'translateY(300%)',
    },
    '100%': {
      opacity: '1',
      transform: 'translateY(0)',
    },
  },
}));
function BannerItem({ data }) {
  const classes = useStyles();
  return (
    <div
      className={classes.banner_bg}
      style={{ backgroundImage: data ? `url('${data.img}')` : 'Loading...' }}
    >
      <div className={classes.text}>
        <div className={classes.textChild}>
          <span className={classes.textName}>{data ? data.name : 'Loading...'}</span>
          <span className={classes.textInfo}>{data ? data.info : 'Loading..'}</span>
        </div>
        <a className={classes.textLink} href={data ? `${data.link}` : '/error'}>
          <div className={classes.btnLink}>{BTN_BANNER_TEXT}</div>
        </a>
      </div>
    </div>
  );
}

export default BannerItem;
