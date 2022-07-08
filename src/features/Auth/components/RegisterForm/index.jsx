import { yupResolver } from '@hookform/resolvers/yup';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import InputField from '../../../../components/form-control/inputField';
import PasswordField from '../../../../components/form-control/passwordField';
import Loading from '../../../../components/Loading';

RegisterForm.propTypes = {
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
      .required('Please enter your password')
      .min(8, 'Please enter 8 character or more'),
    retypePassword: yup
      .string()
      .required('Please retype your password')
      .oneOf([yup.ref('password')], 'Please retype your password'),
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
        <button
          fullWidth
          className={classes.btn}
          type="submit"
          variant="conteined"
          color="primary"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
