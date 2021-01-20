import React, { useEffect } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandling from '../../hoc/withErrorHandling/withErrorHandling';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

const Orders = (props) => {
  const { onFetchOrder, token, userId } = props;
  useEffect(() => {
    onFetchOrder(token, userId);
  }, [onFetchOrder, token, userId]);

  let order = <Spinner />;
  if (!props.loading) {
    order = props.orders.map((order) => (
      <Order
        key={order.id}
        ingredients={order.ingredient}
        price={order.price}
        id={order.id}
        delete={() =>
          props.onDeleteHandler(order.id, props.orders, props.token)
        }
      />
    ));
  }

  return order;
};

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrder: (token, userId) =>
      dispatch(actions.fetchOrder(token, userId)),
    onDeleteHandler: (id, orders, token) =>
      dispatch(actions.deleteOrderHandler(id, orders, token)),
    // autoAuthLogin: () => dispatch(actions.authAutoLogin()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandling(Orders, axios));
