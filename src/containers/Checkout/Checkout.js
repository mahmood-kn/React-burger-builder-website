import React, { Suspense } from 'react';
import CheckoutSummery from '../../components/Order/CheckoutSummery/CheckoutSummery';
import { Route, Redirect } from 'react-router-dom';
// import ContactData from '../ContactData/ContactData';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';

const ContactData = React.lazy(() => import('../ContactData/ContactData'));

const Checkout = (props) => {
  const cancelHandler = () => {
    props.history.goBack();
  };

  const continueHandler = () => {
    props.history.replace('/checkout/contact-data');
  };

  let summery = <Redirect to='/' />;
  if (props.ingredients) {
    const purchasedRedirect = props.purchased ? (
      <Redirect to='/ordersubmited' />
    ) : null;
    summery = (
      <React.Fragment>
        {purchasedRedirect}
        <CheckoutSummery
          ingredients={props.ingredients}
          cancelHandler={cancelHandler}
          continueHandler={continueHandler}
        />
        <Route
          path={props.match.path + '/contact-data'}
          render={() => (
            <Suspense fallback={<Spinner {...props} />}>
              <ContactData />
            </Suspense>
          )}
        />
      </React.Fragment>
    );
  }
  return summery;
};

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
  };
};

export default connect(mapStateToProps)(Checkout);
