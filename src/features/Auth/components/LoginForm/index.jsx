import CodeOffIcon from '@mui/icons-material/CodeOff';
import { Avatar } from '@mui/material';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import React from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import InputField from '../../../../components/form-control/inputField';
import PasswordField from '../../../../components/form-control/passwordField';
import Loading from '../../../../components/Loading';
import { yupResolver } from '@hookform/resolvers/yup';

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
};
const useStyles = makeStyles((theme) => ({
  btn: {
    color: 'white',
    backgroundColor: '#717fe0',
    height: '48px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    boxSizing: 'border-box',
    outline: '0',
    border: '0',
    margin: '0',
    cursor: 'pointer',
    userSelect: 'none',
    verticalAlign: 'middle',
    fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
    fontWeight: '500',
    fontSize: '0.875rem',
    lineHeight: '1.75',
    letterSpacing: '0.02857rem',
    textTransform: 'uppercase',
    minWidth: '64px',
    padding: '6px 16px',
    borderRadius: '4px',
    width: '100%',
    textDecoration: 'none',
    '&:hover': {
      backgroundColor: 'rgba(113, 127, 224, 0.7)',
      color: 'white',
    },
  },
}));

function LoginForm(props) {
  const classes = useStyles();
  const schema = yup.object().shape({
    identifier: yup
      .string()
      .required('Please enter your email')
      .email('Please enter a email'),
    password: yup.string().required('Please enter your password'),
  });
  const form = useForm({
    defaultValues: {
      identifier: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });
  const { isSubmitting } = form.formState;
  const handleSubmit = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
    }
  };
  return (
    <div className="register">
      {isSubmitting && <Loading className="register__loading" />}
      <h2 className="register__title">Login</h2>
      <Avatar className="register__avatar">
        <CodeOffIcon />
      </Avatar>
      <form className="register__form" onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField
          className="register__input"
          name="identifier"
          label="Email"
          form={form}
        />
        <PasswordField
          className="register__input"
          name="password"
          label="Password"
          form={form}
        />
        <button
          fullWidth
          className={classes.btn}
          type="submit"
          variant="conteined"
          color="primary"
        >
          Log In
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
