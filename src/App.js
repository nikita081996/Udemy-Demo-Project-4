import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import RouterComponent from './RouterComponent';

class App extends Component {
  componentWillMount() {
    const firebase = require('firebase');

    firebase.initializeApp({
      apiKey: 'AIzaSyCpDlsdd0MQmoheo0uXTmvC4TYgFm2hzpU',
      authDomain: 'authentication-88102.firebaseapp.com',
      databaseURL: 'https://authentication-88102.firebaseio.com',
      projectId: 'authentication-88102',
      storageBucket: 'authentication-88102.appspot.com',
      messagingSenderId: '752827389996'
    });
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <RouterComponent />
      </Provider>
    );
  }
}

export default App;
