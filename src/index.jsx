import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, browserHistory} from 'react-router';
import App from './components/App';
import {syncHistoryWithStore} from 'react-router-redux';
import store from './redux/store/store';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MainSection from './components/MainSection';

const history = syncHistoryWithStore(browserHistory, store);
injectTapEventPlugin();

ReactDom.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <Route path="/mainSection" component={MainSection}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);