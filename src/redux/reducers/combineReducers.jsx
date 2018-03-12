import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import SearchReducer from './SearchReducer';
import ContentPageReducer from './ContentPageReducer';
import EmailReducer from './EmailReducer';

export default combineReducers ({
  search: SearchReducer,
  contentPage: ContentPageReducer,
  listEmails: EmailReducer,
  routing: routerReducer
});