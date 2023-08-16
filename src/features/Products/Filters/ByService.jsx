import { Checkbox, FormControlLabel } from '@mui/material';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  list: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: '0.2rem 0',
    margin: '0.5rem 0',
  },
}));
ByService.propTypes = {
  filters: PropTypes.object,
  onChange: PropTypes.func,
};

function ByService({ filters = {}, onChange }) {
  const classes = useStyles();
  const handleChange = (e) => {
    if (onChange) {
      const { name, checked } = e.target;
      onChange({ [name]: checked });
    }
  };
  return (
    <ul className={classes.list}>
      {[
        { value: 'isPromotion', label: 'Sale' },
        { value: 'isFreeShip', label: 'FreeShip' },
      ].map((service) => (
        <li key={service.value}>
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={Boolean(filters[service.value])}
                onChange={handleChange}
                name={service.value}
              />
            }
            label={service.label}
          />
        </li>
      ))}
    </ul>
  );
}

export default ByService;
