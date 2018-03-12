import store from '../store/store';
import axios from 'axios';

class EmailActions {
  getListEmails() { //TODO why emails are in page action???
    store.dispatch({type: 'EmailsLoading'});
    axios.get('http://brogrammerserver.net/endpoints-inbox/listEmails.php')
      .then((response) => {
        store.dispatch({type: 'EmailsLoaded', data:response.data});
      })
      .catch((err) => {
        console.error(err);
        store.dispatch({type: 'listEmailsErrorLoading'});
      })
  }

  composeEmail(to, title, content) {
    axios.post('http://brogrammerserver.net/endpoints-inbox/compose.php',
      {to, title, content})
      .then((response) => {
        console.log('Email is sent');
      })
      .catch((err) => {
        console.error(err);
        console.log("it has error======", err);
    })
  }
}

export default new EmailActions();