import React from 'react';
import { Provider } from 'react-redux';
import Layout from './components/Layout';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.css';

import store from './store';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Layout />
      </Provider>
    );
  }
}
