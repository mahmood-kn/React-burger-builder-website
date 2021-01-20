import React from 'react';
import classes from './Order.module.css';
import Button from '../../components/UI/Button/Button';

const order = (props) => {
  const ingredients = [];
  for (let ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName],
    });
  }
  const ingredientsOutput = ingredients.map((ig) => (
    <span key={ig.name} className={classes.ingredient}>
      {ig.name}:({ig.amount})
    </span>
  ));
  return (
    <div className={classes.Order}>
      <div>
        <p>Ingredient: {ingredientsOutput}</p>
        <p>
          Total Price:{' '}
          <strong>USD: {Number.parseFloat(props.price).toFixed(2)}</strong>
        </p>
      </div>
      <div>
        <Button type='Danger' clicked={props.delete}>
          X
        </Button>
      </div>
    </div>
  );
};

export default order;
