import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummery.module.css';

const checkoutSummery = (props) => {
  return (
    <div className={classes.CheckoutSummery}>
      <h1>We hope it taste well!</h1>
      <div style={{ width: '100%' }}>
        <Burger ingredient={props.ingredients} />
        <Button type='Danger' clicked={props.cancelHandler}>
          CANCEL
        </Button>
        <Button type='Success' clicked={props.continueHandler}>
          CONTINUE
        </Button>
      </div>
    </div>
  );
};

export default checkoutSummery;
