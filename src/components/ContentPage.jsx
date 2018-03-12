import React, {Component} from 'react';
import {connect} from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';

export default connect(state => ({
  contentPage: state.contentPage
}))(class ContentPage extends Component {

  render() {
    const styles = this._styles();

    const {contentPage} = this.props;
    console.log('this.props=====', this.props);
    const content = contentPage.error ? contentPage.error : contentPage.data.content;
    return (
      <div>
        {contentPage.loading ?
          <CircularProgress size={120} thickness={10} style={styles.CircularProgress}/> :
          content
        }
      </div>
    );
  }
  //
  // _doSomething() {
  //   console.log('do Something******');
  // }

  _styles() {
    return {
      CircularProgress: {
        top: '170px',
        left: '50%'
      }
    }
  }
});

