import React, { useState } from 'react';
import Button from '../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';
import { connect } from 'react-redux';
import * as orderActions from '../../store/actions/index';
import axios from '../../axios-orders';
import withErrorHandling from '../../hoc/withErrorHandling/withErrorHandling';
import { updateObject, checkValidity } from '../../shared/utility';

const initialOrderForm = {
  name: {
    elementType: 'input',
    elementConfig: {
      type: 'text',
      placeholder: 'Your Name',
    },
    value: '',
    touched: false,
    validation: {
      required: true,
    },
    valid: false,
  },
  street: {
    elementType: 'input',
    elementConfig: {
      type: 'text',
      placeholder: 'Your Street',
    },
    value: '',
    touched: false,
    validation: {
      required: true,
    },
    valid: false,
  },
  zipcode: {
    elementType: 'input',
    elementConfig: {
      type: 'text',
      placeholder: 'ZIP Code',
    },
    value: '',
    touched: false,
    validation: {
      required: true,
      minLength: 5,
      mixLength: 5,
    },
    valid: false,
    invalidMsg: 'Please Enter 5 chars',
  },

  country: {
    elementType: 'input',
    elementConfig: {
      type: 'text',
      placeholder: 'Your Country',
    },
    value: '',
    touched: false,
    validation: {
      required: true,
    },
    valid: false,
  },
  email: {
    elementType: 'input',
    elementConfig: {
      type: 'email',
      placeholder: 'Your Email',
    },
    value: '',
    touched: false,
    validation: {
      required: true,
      isEmail: true,
    },
    valid: false,
    invalidMsg: 'Your email is not valid',
  },

  deliveryMethod: {
    elementType: 'select',
    elementConfig: {
      options: [
        { value: 'fastest', displayValue: 'Fastest' },
        { value: 'cheapest', displayValue: 'Cheapest' },
      ],
    },
    value: 'fastest',
    validation: {},
    valid: true,
  },
};

export const ContactData = (props) => {
  const [orderForm, setOrderForm] = useState(initialOrderForm);
  const [formIsvalid, setFormIsvalid] = useState(false);

  const orderBtnHandler = (e) => {
    e.preventDefault();
    const formData = {};
    for (let formElementId in orderForm) {
      formData[formElementId] = orderForm[formElementId].value;
    }
    const order = {
      ingredient: props.ingredient,
      price: props.price,
      formData: formData,
      userId: props.userId,
    };
    props.onPurchaseStart(order, props.token);
  };

  const inputChangeHandler = (e, id) => {
    const updatedFormEl = updateObject(orderForm[id], {
      value: e.target.value,
      valid: checkValidity(e.target.value, orderForm[id].validation),
      touched: true,
    });

    const updatedOrderForm = updateObject(orderForm, {
      [id]: updatedFormEl,
    });

    let formIsvalid = true;
    for (let inputId in updatedOrderForm) {
      formIsvalid = updatedOrderForm[inputId].valid && formIsvalid;
    }
    setOrderForm(updatedOrderForm);
    setFormIsvalid(formIsvalid);
  };

  const formArray = [];
  for (let key in orderForm) {
    formArray.push({
      id: key,
      config: orderForm[key],
    });
  }
  let form = (
    <div className={classes.ContactData}>
      {formArray.map((formEl) => {
        return (
          <Input
            key={formEl.id}
            label={formEl.id.toUpperCase()}
            elementConfig={formEl.config.elementConfig}
            elementType={formEl.config.elementType}
            value={formEl.config.value}
            invalid={!formEl.config.valid}
            shouldValidate={formEl.config.validation}
            touched={formEl.config.touched}
            valueType={formEl.id}
            invalidMsg={
              formEl.config.invalidMsg ? formEl.config.invalidMsg : null
            }
            changed={(e) => inputChangeHandler(e, formEl.id)}
          />
        );
      })}
      <Button disabled={!formIsvalid} type='Success'>
        ORDER
      </Button>
    </div>
  );
  if (props.loading) {
    form = <Spinner />;
  }
  return <form onSubmit={orderBtnHandler}>{form}</form>;
};

const mapStateToProps = (state) => {
  return {
    ingredient: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPurchaseStart: (orderData, token) =>
      dispatch(orderActions.purchaseBurger(orderData, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandling(ContactData, axios));
