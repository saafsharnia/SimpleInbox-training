import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import AutoComplete from 'material-ui/AutoComplete';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import SearchBar from './SearchBar';
import {connect} from 'react-redux';
import SearchAction from '../redux/actions/SearchActions';


export default connect ( state => ({
  contentPage: state.contentPage,
  listEmails: state.listEmails,
  search: state.search,
  // searchFocused: state.search.searchFocused
}))(class ToolbarComponent extends Component {
  state = {
    contentTitle: '',
    emailsPrev: false,
    dataSource: [],
  };

  componentWillReceiveProps(nextProps) {
    if(nextProps.contentPage.loading) {
      this.setState({emailsPrev: false});
    }
    else if(nextProps.listEmails.loading) {
      this.setState({emailsPrev: true});
    }
  }

  render() {
    const styles = this._styles();
    // const titleText = this.props.contentPage.data ?
    // const contentTitle = this.state.contentTitle ? this.state.contentTitle : "Simple Inbox";
    const contentTitle = this.state.emailsPrev ?  "Simple Inbox" : this.props.contentPage.data.title;
    // const title = this.state.searchFocused ? "Search" : contentTitle;
    const title = this.props.search.searchFocused ? "Search" : contentTitle;

    let searchFocusedOnResponsive = false;
    if(this.props.search.searchFocused && screen.width < 600)
      searchFocusedOnResponsive = true;

    return (
      <div>
        {
          searchFocusedOnResponsive ?
            <div>
              <FontIcon className="material-icons">close</FontIcon>

              <div>
                <AutoComplete
                  ref="searchInput"
                  hintText='Search'
                  hintStyle={{color: 'white'}}
                  searchText={'Search'}
                  dataSource={this._resultTitles()}
                  onUpdateInput={(text, datasource, params) => this._onUpdateInput(text, datasource, params) }
                  floatingLabelText={false}
                  fullWidth={true}
                  filter={AutoComplete.caseInsensitiveFilter}
                  /*onFocus={() => this._onSearchFocused(true)}*/
                  /*onClose={() => this._onSearchFocused(false)}*/
                  underlineStyle={{display: 'none'}}
                  onNewRequest={this._onNewRequest.bind(this)}
                  /*style={styles.search.autoComplete}*/
                >
                </AutoComplete>
              </div>
            </div>
            :
            <AppBar
              title={title}
              iconElementLeft={<IconButton onClick={this._onSideBarToggled.bind(this)}><NavigationMenu /></IconButton>}
              iconElementRight={
                <IconMenu
                  iconButtonElement={
                    <IconButton><MoreVertIcon /></IconButton>
                  }
                  targetOrigin={styles.rightIconOrigin}
                  anchorOrigin={styles.rightIconOrigin}
                >
                  <MenuItem primaryText="Refresh"/>
                  <MenuItem primaryText="Help"/>
                  <MenuItem primaryText="Sign out"/>
                </IconMenu>
              }
              style={styles.AppBar.root}
              titleStyle={styles.AppBar.titleStyle}
            >
              <SearchBar
                /*onSearchFocused={this._onSearchFocused.bind(this)} */
                searchLoading={this.props.searchLoading}
              />
            </AppBar>
        }
      </div>
    );
  }

    _titleText() {

    }

    _onSearchFocused(bool) {
      // this.setState({searchFocused});
      SearchAction.searchFocuse(bool);
    }

    _onSideBarToggled() {
      // console.log('***************');
      this.props.onSideBarToggled();
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
        title: {
          width: 120
        },

        rightIconOrigin: {
          horizontal: 'right',
          vertical: 'top'
        },

        AppBar: {
          root: {
            // backgroundColor: this.state.searchFocused ? '#f2f2f2' : 'rgb(0, 188, 212)',
            backgroundColor: this.props.search.searchFocused ? '#f2f2f2' : 'rgb(0, 188, 212)',
            position: 'fixed',
            top: 0,
            zIndex: 1500,
          },
          titleStyle: {
            // color: this.state.searchFocused ? '#000' : 'white'
            color: this.props.search.searchFocused ? '#000' : 'white'

          }
        },

        Search: {
          autoComplete: {

          }
        }
      }
    }
});
// export default class