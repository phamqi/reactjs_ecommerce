import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';

import BannerItem from './BannerItem';
import { dataBanner } from './dataBanner';
Banner.propTypes = {};
const useStyles = makeStyles((theme) => ({
  root: {
    padding: '80px 0 50px 0',
  },
  item: {},
  text: {},
  text_sub: {},
}));
function Banner(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Grid
          container
          sx={{
            maxWidth: '1200px',
            justifyContent: 'space-between',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          {dataBanner.map((item) => (
            <Grid key={item.id} item xs={12} sm={4} md={4} lg={4} p={2}>
              <BannerItem dataBanner={item} />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}

export default Banner;
