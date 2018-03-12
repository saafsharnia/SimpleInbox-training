import store from '../store/store';
import axios from 'axios';

class PageActions {

  getPage(pageName) {
    store.dispatch({type: 'ContentLoading'});
    axios.get('http://brogrammerserver.net/endpoints-inbox/page-'+pageName+'.php')
      .then((response) => {
        store.dispatch({type: 'ContentLoaded', data: response.data});
        })
      .catch((err) => {
        store.dispatch({type: 'ContentErrorLoading'});
        console.error(err);
      })
  }
}

export default new PageActions();

/*
() => console.error('asd');
(err) => {return console.error('asd');}
err => {console.error('asd');}
err => console.error('asd');
err => (console.error('asd'));*/
