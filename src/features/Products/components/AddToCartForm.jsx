import React from 'react';
import PropTypes from 'prop-types';
import QuantityField from '../../../components/form-control/quantity';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { makeStyles } from '@mui/styles';
import * as yup from 'yup';
import { BG_COLOR } from '../../../constants';

const useStyles = makeStyles((theme) => ({
  divQuantity: {
    padding: '0 1.5rem',
  },
  formQuantity: {
    '&> button': {
      width: '50%',
      backgroundImage: `${BG_COLOR}`,
      color: 'white',
      height: '2.55rem',
      borderRadius: '5px',
    },
    '& > div > div > div > button': {
      border: '1px solid rgba(0,0,0,0.3)',
      borderRadius: '0 5px 5px 0',
      height: '32px',
      '&:first-child': {
        borderRadius: '5px 0 0 5px',
      },
    },
    '& > div > div > div >  div': {
      borderRadius: '0',
      '&> input': {
        width: '50px',
        padding: '0',
        height: '32px',
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
