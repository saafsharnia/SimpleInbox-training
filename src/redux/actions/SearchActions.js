import store from '../store/store';
import $ from 'jquery';

class SearchAction {

  resultsXHR = null;

  getResults(value) {
    if (this.resultsXHR != null) {
      this.resultsXHR.abort();
    }

    store.dispatch({type: 'SearchLoading'});
    this.resultsXHR = $.ajax({
      url: 'http://brogrammerserver.net/endpoints-inbox/searchPages.php',
      data: {
        query: value
      },
      success: (response) => {
        store.dispatch({type: 'SearchLoaded', data: response});
      },
      error: (xhr, status) => {
        console.log('---- error', status);
        store.dispatch({type: 'SearchErrorLoading'});
        console.error(xhr, status);
      }
    });
  }

 /* ___getResults_bak(value) {
    console.log("---- searchActions.go for > ", value);
    store.dispatch({type: 'SearchLoading'});
    axios.get('http://brogrammerserver.net/endpoints-inbox/searchPages.php',{
      params: {
        query: value
      }
    })
    .then((response) => {
      console.log('data in SearchAction==', response.data);
      store.dispatch({type: 'TitlesShow', data: response.data});
    })
    .catch((err) => {
      store.dispatch({type:'ErrorLoadingSearch'});
      console.error(err);
    });
  }*/

  getPage(content, title) {
    store.dispatch({type: 'ContentLoading'});
    // store.dispatch({type: 'ShowPage', data: content});
    store.dispatch({type: 'ContentLoaded', data: {content, title}});
  }

  searchFocuse(bool) {
    if(bool)
      store.dispatch({type: 'SearchFocused'});
    else
      store.dispatch({type: 'SearchUnfocused'});
  }
}

export default new SearchAction();

