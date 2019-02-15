
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import store from './store';
import { getUser } from './actions/app.actions';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    getUser();
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </Provider>
    );
  }
}
