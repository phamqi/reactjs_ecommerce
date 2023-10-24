import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  form: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

function InputField(props) {
  const { form, name, label, disabled } = props;
  const { errors } = form;
  const hasErrors = errors[name];
  return (
    <Controller
      sx={{ m: 0 }}
      name={name}
      control={form.control}
      render={({ onChange, onBlur, value, name, ref }) => (
        <TextField
          label={label}
          fullWidth
          margin="none"
          size="small"
          error={!!hasErrors}
          disabled={disabled}
          helperText={errors[name]?.message}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          inputProps={{ maxLength: 2 }}
        />
      )}
    />
  );
}
export default InputField;
