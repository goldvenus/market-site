import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import store from './store';
import {getCarts} from "./core/actions/cart.action";
import {getFavourites} from "./core/actions/favourite.action";
import { getUser } from './core/actions/user.action';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    getUser();
    getCarts();
    getFavourites();
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Layout/>
        </BrowserRouter>
      </Provider>
    );
  }
}
