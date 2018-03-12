import {createStore} from 'redux';
import combineReducers from '../reducers/combineReducers';

const store = createStore(
  combineReducers,
  {},
  window.devToolsExtension ? window.devToolsExtension() : undefined
);

export default store;