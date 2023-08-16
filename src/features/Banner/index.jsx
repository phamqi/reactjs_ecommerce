import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';

import BannerItem from './BannerItem';
import { dataBanner } from './dataBanner';
Banner.propTypes = {};
const useStyles = makeStyles((theme) => ({
  root: {
    padding: '80px 0 50px 0',
  },
  banner_warp: {
    maxWidth: '1200px',
    justifyContent: 'space-between',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'grid',
    gridGap: '1rem',
    gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
    gridTemplateRows: '1fr 1fr',
    gridTemplateAreas: `'h1 h1 h2 h2 h3 h3' 'h1 h1 h2 h2 h3 h3'`,
  },
  banner: {
    '&:first-child': {
      gridArea: 'h1',
    },
    '&:nth-child(2)': {
      gridArea: 'h2',
    },
    '&:last-child': {
      gridArea: 'h3',
    },
  },
  '@media screen and (max-width: 900px)': {
    root: {
      padding: '30px 0',
    },
    banner_warp: {
      gridTemplateAreas: `'h1 h1 h1 h2 h2 h2'  'h3 h3 h3 h3 h3 h3'`,
      gridTemplateRows: '1fr 1fr',
    },
  },
  '@media screen and (max-width: 576px)': {
    root: {
      padding: '1rem 0',
    },
    banner_warp: {
      gridTemplateRows: '1fr 1fr 1fr',
      gridTemplateAreas: `'h1 h1 h1 h1 h1 h1' 'h2 h2 h2 h2 h2 h2'  'h3 h3 h3 h3  h3 h3'`,
    },
  },
}));
function Banner(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.banner_warp}>
        {dataBanner.map((item) => (
          <div key={item.id} className={classes.banner}>
            <BannerItem data={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Banner;
