import React, {Component} from 'react';
import ListEmails from './ListEmails';
import ContentPage from './ContentPage';
import {connect} from 'react-redux';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Compose from './Compose';
import Snackbar from 'material-ui/Snackbar';

export default connect( state => ({
  search: state.search,
  contentPage: state.contentPage,
  listEmails: state.listEmails
}))(class MainSection extends Component {
  state = {
    composeClicked : false,
    emailsPrev: true,
    emailSentSnackbar : false
  };

  componentWillMount() {
    if(this.props.search.loading) {
      this._setSearchLoading(this.props.search.loading);
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.contentPage.loading) {
      this.setState({emailsPrev: false});
    }
    else if(nextProps.listEmails.loading) {
      this.setState({emailsPrev: true});
    }
  }

  render () {
    const styles = this._styles();

    return (
      <div style={styles.content} onClick={this._onMainSectionClicked.bind(this)}>
        {this.state.emailsPrev ?
          <ListEmails/> :
          <ContentPage/>
        }
          <FloatingActionButton secondary={true} style={styles.addButton} onClick={this._onComposeToggled.bind(this)}>
          <ContentAdd/>
        </FloatingActionButton>

        {this.state.composeClicked ?
          <Compose
            onComposeToggled={this._onComposeToggled.bind(this)}
            onEmailSent={this._onEmailSent.bind(this)}
          /> :
          <div></div>
        }

        <Snackbar
          open={this.state.emailSentSnackbar}
          message="Email is sent"
          action="undo"
          autoHideDuration={4000}
          onActionTouchTap={this._onSnackbarActionTouchTap.bind(this)}
          onRequestClose={this._onSnackbarClosed.bind(this)}
        />
      </div>

    );

  }

  _onSnackbarActionTouchTap() {
    console.log('<<<<< Email is undid');
  }

  _onSnackbarClosed () {
    this.setState({
      emailSentSnackbar : false
    });
  }

  _onEmailSent() {
    this.setState({
      emailSentSnackbar : true
    });
  }

  _onComposeToggled() {
    const composeClicked = !this.state.composeClicked;
    this.setState({composeClicked}, () => {
      console.log('compose is clicked===>>>', this.state.composeClicked);
    });
  }

  _setSearchLoading(loading) {
    this.props.onSearchLoading(loading);
  }

  _onMainSectionClicked() {
    if(screen.width < 600 && this.props.sideBarOpened) {
      this.props.onSideBarToggled();
    }
  }

  _styles() {
    return {
      content: {
        marginRight: 'auto',
        marginLeft: this.props.sideBarOpened && screen.width > 600 ? '270px' : 'auto',
        marginTop: 80,
        maxWidth: this.props.sideBarOpened ? '80%' : '95%',
        clear: 'both'
      },

      addButton: {
        position: 'fixed',
        right: 30,
        bottom: 30,
        zIndex: 150
      },

    }
  }

});