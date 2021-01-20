import React, { useState, useEffect, useCallback } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery';
import axios from '../../axios-orders';
import withErrorHandling from '../../hoc/withErrorHandling/withErrorHandling';
import Spinner from '../../components/UI/Spinner/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions/index';

export const BurgerBuilder = (props) => {
  const [purchasing, setPurchasing] = useState(false);
  const dispatch = useDispatch();

  const ingredient = useSelector((state) => state.burgerBuilder.ingredients);
  const totalPrice = useSelector((state) => state.burgerBuilder.totalPrice);
  const error = useSelector((state) => state.burgerBuilder.error);
  const isAuthenticated = useSelector((state) => state.auth.token !== null);

  const onAdd = (ingName) => dispatch(actions.addIngredients(ingName));
  const onRemove = (ingName) => dispatch(actions.removeIngredients(ingName));
  const onIngredientSet = useCallback(
    () => dispatch(actions.initIngredients()),
    [dispatch]
  );
  const onPurchased = () => dispatch(actions.purchaseInit());
  const onSetAuthRedirectPath = (path) =>
    dispatch(actions.setAuthRedirectPath(path));

  useEffect(() => {
    onIngredientSet();
  }, [onIngredientSet]);

  const updatedPurchaseState = (ingredient) => {
    const sum = Object.keys(ingredient)
      .map((igKey) => {
        return ingredient[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  };

  const purchasingHandler = () => {
    if (isAuthenticated) {
      setPurchasing(true);
    } else {
      onSetAuthRedirectPath('/checkout');
      props.history.push('/auth');
    }
  };
  const purchasingCancelHandler = () => {
    setPurchasing(false);
  };
  const purchaseContinuedHandler = () => {
    onPurchased();
    props.history.push('/checkout');
  };

  const disabledInfo = { ...ingredient };
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  let orderSummery = null;

  let burger = error ? (
    <p style={{ textAlign: 'center' }}>ingredients can't be shown!</p>
  ) : (
    <Spinner />
  );

  if (ingredient) {
    burger = (
      <Aux>
        <Burger ingredient={ingredient} />
        <BuildControls
          ingredientAdd={onAdd}
          ingredientRemove={onRemove}
          disabled={disabledInfo}
          price={totalPrice}
          purchasable={updatedPurchaseState(ingredient)}
          order={purchasingHandler}
          isAuth={isAuthenticated}
        />
      </Aux>
    );

    orderSummery = (
      <OrderSummery
        ingredients={ingredient}
        price={totalPrice}
        purchaseCancelled={purchasingCancelHandler}
        purchaseContinued={purchaseContinuedHandler}
      />
    );
  }

  return (
    <Aux>
      <Modal show={purchasing} modalCancel={purchasingCancelHandler}>
        {orderSummery}
      </Modal>
      {burger}
    </Aux>
  );
};

export default withErrorHandling(BurgerBuilder, axios);
