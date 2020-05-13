import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import Layout from './component/Layout/Layout';
import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder';
import Checkout from './container/Checkout/Checkout';
import Orders from './container/Orders/Orders';
import reducer from './store/reducer';

const store = createStore(reducer);

class App extends Component {

  render() {
    return (
      <Provider store = {store}>
        <BrowserRouter>
          <div className="App">
            <Layout>
                <Switch>
                  <Route path="/checkout" component={Checkout} />
                  <Route path="/orders" component={Orders} />
                  <Route path="/" exact component={BurgerBuilder} />
                </Switch>
            </Layout>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
