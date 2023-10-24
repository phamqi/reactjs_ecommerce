import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import QuantityField from './quantity';

const useStyles = makeStyles((theme) => ({
  divQuantity: {
    padding: '0 1.5rem',
  },
  formQuantity: {
    '&> button': {
      width: '9rem',
      backgroundColor: '#717fe0',
      color: '#fff',
      height: '2.5rem',
      borderRadius: '23px',
      '&:hover': {
        backgroundColor: '#333',
      },
    },
    '& > div > div > div > button': {
      border: '1px solid rgba(0,0,0,0.3)',
      borderRadius: '0 5px 5px 0',
      height: '2.5rem',
      '&:hover': {
        backgroundColor: '#717fe0',
      },
      '&:first-child': {
        borderRadius: '5px 0 0 5px',
      },
    },
    '& > div > div > div >  div': {
      borderRadius: '0',
      '&> input': {
        width: '4rem',
        padding: '0',
        height: '2.5rem',
        textAlign: 'center',
      },
    },
  },
}));
AddToCartForm.propTypes = {
  onSubmit: PropTypes.func,
};

function AddToCartForm({ onSubmit }) {
  const schema = yup.object().shape({
    quantity: yup
      .number()
      .required('Please enter your name')
      .min(1, 'Please enter lest than 0')
      .typeError('Please enter a number'),
  });
  const form = useForm({
    defaultValues: {
      quantity: 1,
    },

    resolver: yupResolver(schema),
  });
  const classes = useStyles();

  const handleAddToCartSubmit = async (values) => {
    if (onSubmit) {
      await onSubmit(values);
    }
  };
  return (
    <div className={classes.divQuantity}>
      <form
        className={classes.formQuantity}
        onSubmit={form.handleSubmit(handleAddToCartSubmit)}
      >
        <QuantityField name="quantity" label="quantity" form={form} />
        <Button type="submit">Buy</Button>
      </form>
    </div>
  );
}

export default AddToCartForm;
