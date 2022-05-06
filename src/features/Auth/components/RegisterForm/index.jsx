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
import './styles.scss';
import { yupResolver } from '@hookform/resolvers/yup';
import { BG_COLOR } from '../../../../constants';

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
};
const useStyles = makeStyles((theme) => ({
  root: {},
  btnRegister: {
    background: `${BG_COLOR}`,
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
}));

function RegisterForm(props) {
  const classes = useStyles();
  const schema = yup.object().shape({
    fullName: yup
      .string()
      .required('Please enter your name')
      .test('Your name should has at least two words', (value) => {
        return value.split(' ').length >= 2;
      }),
    email: yup.string().required('Please enter your email').email('Please enter a email'),
    password: yup
      .string()
      .required('Please enter your pasword')
      .min(8, 'Please enter 8 character or more'),
    retypePassword: yup.string().required('Please retype your password'),
    retypePassword: yup
      .string()
      .required('Please retype your password')
      .oneOf([yup.ref('password')], 'Please retype your passwrd'),
  });
  const form = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      retypePassword: '',
    },
    resolver: yupResolver(schema),
  });
  const { isSubmitting } = form.formState;
  const handleSubmit = async (values) => {
    const { onSubmit } = props;
    if (!onSubmit) return;
    if (onSubmit) {
      await onSubmit(values);
    }
    // form.reset();
  };
  return (
    <div className="register">
      {isSubmitting && <Loading />}
      <h2 className="register__title">Creat a Account</h2>
      <Avatar className="register__avatar">
        <CodeOffIcon />
      </Avatar>
      <form className="register__form" onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField
          className="register__input"
          name="fullName"
          label="Full Name"
          form={form}
        />
        <InputField className="register__input" name="email" label="Email" form={form} />
        <PasswordField
          className="register__input"
          name="password"
          label="Password"
          form={form}
        />
        <PasswordField
          className="register__input"
          name="retypePassword"
          label="Retype Password"
          form={form}
        />
        <Button
          fullWidth
          className={classes.btnRegister}
          type="submit"
          variant="conteined"
          color="primary"
        >
          SignUp
        </Button>
      </form>
    </div>
  );
}

export default RegisterForm;
