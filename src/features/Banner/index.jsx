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
  },
}));
function Banner(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container className={classes.banner_warp}>
        {dataBanner.map((item) => (
          <Grid
            key={item.id}
            item
            xs={12}
            sm={4}
            md={4}
            lg={4}
            className={classes.banner}
            p={2}
          >
            <BannerItem dataBanner={item} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Banner;
