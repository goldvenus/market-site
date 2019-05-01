import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { getUser } from './core/actions/user.action';

import Layout from './components/Layout';
import store from './store';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    getUser();
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
