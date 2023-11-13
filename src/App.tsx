import React from 'react';
import './App.css';
import { store } from './store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { ShopConnector } from './shop/ShopConnector';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/shop" component={ShopConnector}/>
          <Redirect to="/shop" />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
