import React, { Suspense } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { Route, Switch, Redirect } from 'react-router-dom';
import Logout from './components/Auth/Logout/Logout';
import Spinner from './components/UI/Spinner/Spinner';
import { connect } from 'react-redux';

const Orders = React.lazy(() => import('./containers/Orders/Orders'));
const Auth = React.lazy(() => import('./components/Auth/Auth'));
const OrderSubmited = React.lazy(() =>
  import('./components/OrderSubmited/OrderSubmited')
);
const Checkout = React.lazy(() => import('./containers/Checkout/Checkout'));

const App = (props) => {
  let routers = (
    <Switch>
      <Route path='/auth' render={(props) => <Auth {...props} />} />
      <Route path='/' component={BurgerBuilder} exact />
      <Redirect to='/' />
    </Switch>
  );

  if (props.isAuthenticated) {
    routers = (
      <Switch>
        <Route path='/orders' render={(props) => <Orders {...props} />} />
        <Route path='/logout' component={Logout} />
        <Route path='/auth' render={(props) => <Auth {...props} />} />
        <Route path='/checkout' render={(props) => <Checkout {...props} />} />
        <Route
          path='/ordersubmited'
          render={(props) => <OrderSubmited {...props} />}
        />
        <Route path='/' component={BurgerBuilder} exact />
        <Redirect to='/' />
      </Switch>
    );
  }
  return (
    <div>
      <Layout>
        <Suspense fallback={<Spinner />}>{routers}</Suspense>
      </Layout>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(App);
