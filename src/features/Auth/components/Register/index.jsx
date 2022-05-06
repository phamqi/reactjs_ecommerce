import { unwrapResult } from '@reduxjs/toolkit';
import React from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../userSlice';
import RegisterForm from '../RegisterForm';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';

Register.propTypes = {
  redirectLogin: PropTypes.func,
};

function Register({ redirectLogin }) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = async (values) => {
    try {
      values.username = values.email;
      const action = register(values);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);
      enqueueSnackbar('Register Successfully', { variant: 'success' });
      if (redirectLogin) {
        redirectLogin();
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };
  return <RegisterForm onSubmit={handleSubmit} />;
}

export default Register;
