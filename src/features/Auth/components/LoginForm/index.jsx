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
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
}));

function LoginForm(props) {
  const classes = useStyles();
  const schema = yup.object().shape({
    identifier: yup
      .string()
      .required('Please enter your email')
      .email('Please enter a email'),
    password: yup.string().required('Please enter your pasword'),
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
    // form.reset();
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
        <Button
          fullWidth
          className={classes.root}
          type="submit"
          variant="conteined"
          color="primary"
        >
          Sign in
        </Button>
      </form>
    </div>
  );
}

export default LoginForm;
