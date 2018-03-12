import React, {Component} from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import FontIcon from 'material-ui/FontIcon';
import SearchAction from '../redux/actions/SearchActions';
import {connect} from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';

export default connect(state => ({
  search: state.search
}))(class SearchBar extends Component {

  state = {
    searchFocused: false,
    dataSource: [],
    searchText: ''
  };

  render() {
    const styles = this._styles();

    return (
      <div>
        {
          screen.width < 600 ?

            <FontIcon className="material-icons" style={styles.search.searchIcon.narrow} onClick={() => this._onSearchFocused(true)}>search</FontIcon>

            :

            <div style={styles.search.container}>
              <FontIcon className="material-icons" style={styles.search.searchIcon.wide}>search</FontIcon>
              <div style={styles.search.autoCompleteDiv}>
                <AutoComplete
                  ref="searchInput"
                  hintText='Search'
                  hintStyle={{color: 'white'}}
                  searchText={this.state.searchText}
                  dataSource={this._resultTitles()}
                  onUpdateInput={(text, datasource, params) => this._onUpdateInput(text, datasource, params) }
                  floatingLabelText={false}
                  fullWidth={true}
                  filter={AutoComplete.caseInsensitiveFilter}
                  onFocus={() => this._onSearchFocused(true)}
                  onClose={() => this._onSearchFocused(false)}
                  underlineStyle={{display: 'none'}}
                  onNewRequest={this._onNewRequest.bind(this)}
                  style={styles.search.autoComplete}
                >
                </AutoComplete>
              </div>
              <div style={styles.search.loading}>
                {this.props.search.loading ?
                  <CircularProgress size={35} thickness={2} /> :
                  <div></div>}
              </div>
            </div>
        }
      </div>
    )
  }

  _onNarrowScreenClicked() {
    console.log('on narrow screen clicked');
  }

  _onSearchFocused(bool) {
    // let searchFocused = !this.state.searchFocused;
    // this.setState({searchFocused});
    // this.props.onSearchFocused(searchFocused);
    SearchAction.searchFocuse(bool);

  }

  _resultTitles() {
    const searchResult = this.props.search.searchResult ? this.props.search.searchResult : [];
    let dataSource = [];
    for (var i =0; i < searchResult.length; i++) {
      dataSource[i] = searchResult[i].title;
    }

    return dataSource;
  }

  _onUpdateInput (text, datasource, params) {
    this.setState({searchText: text});
    if (params.source === 'change') {
      SearchAction.getResults(text);
    }
  }

  _onNewRequest (item) {
    this.setState({searchText: ''});
    const searchResult = this.props.search.searchResult;
    for (var i =0; i < searchResult.length; i++) {
      if (item === searchResult[i].title) {
        var content = searchResult[i].content;
        var title = searchResult[i].title;
        this._onSearchFocused(false);
        SearchAction.getPage(content, title);
      }
    }
  }

  _styles() {
    return {
      search: {
        container: {
          // backgroundColor: this.state.searchFocused ? 'white' : 'rgba(178, 208, 212, 0.3)',
          backgroundColor: this.props.search.searchFocused ? 'white' : 'rgba(178, 208, 212, 0.3)',
          position: 'absolute',
          left: '25%',
          width: '50%',
          height: '70%',
          top: '15%'
        },
        autoComplete: {},
        autoCompleteDiv: {
          width: 'calc(100% - 110px)',
          float: 'left',
          marginLeft: 10
        },
        searchIcon: {
          wide: {
            fontSize: 35,
            // color: this.state.searchFocused ? '#000' : 'white',
            color: this.props.search.searchFocused ? '#000' : 'white',
            marginTop: 7,
            marginLeft: 10,
            float: 'left'
          },

          narrow: {
            fontSize: 35,
            color: this.props.search.searchFocused ? '#000' : 'white',
            position: 'absolute',
            marginTop: '4%',
            right: '13%'
          }
        },
        loading: {
          float: 'right',
          marginRight: 10,
          marginTop: 5
        }
      }
    };
  }

});