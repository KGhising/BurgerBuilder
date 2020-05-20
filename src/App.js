import React, { useEffect, Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import Layout from './component/Layout/Layout';
import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder';
import Logout from './container/Auth/Logout/Logout';
import { connect } from 'react-redux'; 
import * as actions from './store/actions/index';
import Spinner from './component/UI/Spinner/Spinner';

const Checkout = React.lazy(() => {
  return import('./container/Checkout/Checkout');
});

const Orders = React.lazy(() => {
  return import('./container/Orders/Orders');
});

const Auth = React.lazy(() => {
  return import('./container/Auth/Auth');
});

const App = props => {
  useEffect(() => {
    props.onTryAutoSignup(); 
  }, []);
  
  let routes = (
    <Switch>
      <Route path="/auth" render={props => <Auth {...props} />} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/checkout" render={props => <Checkout {...props} />} />
        <Route path="/orders" component={props => <Orders {...props} />} /> 
        <Route path="/logout" component={Logout} />
        <Route path="/auth" render={props => <Auth {...props} />} />
        <Route path="/" exact component={BurgerBuilder} />
      </Switch>
    );
  }
  return (
    <div className="App">
      <Layout>
          <Suspense fallback={<Spinner />}>
            {routes}
            </Suspense>   
      </Layout>
    </div>
  );
} 

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
