import React from 'react';
import Button from '../UI/Button/Button';
import classes from './OrderSubmited.module.css';

const OrderSubmited = (props) => {
  const backToHome = () => {
    props.history.push('/');
  };

  return (
    <div className={classes.OrderSubmited}>
      <h1>Your Order Submitted Successfully.</h1>
      <Button type='Success' clicked={backToHome}>
        Back To BurgerBuilder
      </Button>
    </div>
  );
};

export default OrderSubmited;
