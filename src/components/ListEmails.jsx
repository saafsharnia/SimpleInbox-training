import React, {Component} from 'react';
import {connect} from 'react-redux';
import EmailActions from '../redux/actions/EmailActions';
import CircularProgress from 'material-ui/CircularProgress';
import DetailedLisEmails from './DetailedListEmails';

export default connect(state => ({
  listEmails: state.listEmails
}))(class ListEmails extends Component {
  componentDidMount() {
    this._loadPage();
  }

  render() {
    const styles = this._styles();
    const {listEmails} = this.props;
    const keys = Object.keys(listEmails.data);
    return (
      <div style={styles.containerDiv}> {
        listEmails.loading ?
          <CircularProgress size={120} thickness={10} style={styles.CircularProgress}/> :
          keys.map((key) => {
            return (
              <div key={"div-" + key}>
                {key}
                <DetailedLisEmails date={key} listEmails={listEmails.data[key]}/>
              </div>
            )
          })
      }
      </div>
    );
  }

  _loadPage() {
    EmailActions.getListEmails();
  }

  _styles() {
    return {
      containerDiv: {
        maxWidth: 1000,
      },

      CircularProgress: {
        top: '170px',
        left: '50%'
      }
    };
  }
});

