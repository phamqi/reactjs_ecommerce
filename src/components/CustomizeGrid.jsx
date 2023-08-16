import { createTheme, Grid, ThemeProvider } from '@mui/material';
import PropTypes from 'prop-types';

const theme = createTheme({
  breakpoints: {
    keys: ['sl', 'xs', 'sm', 'md', 'lg', 'xl'],
    values: {
      sl: 0,
      xs: 376,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
    },
  },
});
const GridWithSS = ({ sl, ...other }) => {
  const slClass = `MuiGrid-grid-sl-${sl}`;

  return <Grid className={slClass} {...other} />;
};
CustomizeGrid.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]),
  stt: PropTypes.number,
};
function CustomizeGrid({ children, sl, xs, sm, md, lg, sx }) {
  return (
    <ThemeProvider theme={theme}>
      <GridWithSS item sl={sl} xs={xs} sm={sm} md={md} lg={lg} sx={{ sx }}>
        {children}
      </GridWithSS>
    </ThemeProvider>
  );
}
export default CustomizeGrid;
