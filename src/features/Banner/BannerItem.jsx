import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
BannerItem.propTypes = {
  dataBanner: PropTypes.object,
};
const useStyles = makeStyles((theme) => ({
  banner_bg: {
    position: 'relative',
    width: '100%',
    height: 'max(35vh, min(calc(33vh), calc((600px - 100vw ) * 99999)))',
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
      '& $link': {
        color: 'white',
        transform: 'translateY(0)',
        transition: 'all 0.8s',
      },
      '& $textChild2': {
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
  textInfor: {
    fontSize: '0.9rem',
  },
  textChild2: {
    width: 'fit-content',
    transform: 'scaleX(0)',
    borderBottom: '2px solid white',
  },
  link: {
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
function BannerItem({ dataBanner }) {
  const classes = useStyles();
  return (
    <div
      className={classes.banner_bg}
      style={{ backgroundImage: `url('${dataBanner.img}')` }}
    >
      <div className={classes.text}>
        <div className={classes.textChild}>
          <span className={classes.textName}>{dataBanner.name}</span>
          <span className={classes.textInfor}>{dataBanner.infor}</span>
        </div>
        <a className={classes.textChild2} href={`${dataBanner.link}`}>
          <div className={classes.link}>Shop Now</div>
        </a>
      </div>
    </div>
  );
}

export default BannerItem;
