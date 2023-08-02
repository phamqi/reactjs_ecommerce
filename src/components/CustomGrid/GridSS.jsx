import { createTheme, Grid, ThemeProvider } from '@mui/material';
import PropTypes from 'prop-types';

const theme = createTheme({
  breakpoints: {
    keys: ['ss', 'xs', 'sm', 'md', 'lg', 'xl'],
    values: {
      ss: 0,
      xs: 420,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1500,
    },
  },
});
const GridWithSS = ({ ss, ...other }) => {
  const ssClass = `MuiGrid-grid-ss-${ss}`;
  return <Grid className={ssClass} {...other} />;
};
GridSS.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]),
  stt: PropTypes.number,
};
function GridSS({ children, ss, xs, sm, md, lg, sx }) {
  return (
    <ThemeProvider theme={theme}>
      <GridWithSS item ss={ss} xs={xs} sm={sm} md={md} lg={lg} sx={{ sx }}>
        {children}
      </GridWithSS>
    </ThemeProvider>
  );
}
export default GridSS;
