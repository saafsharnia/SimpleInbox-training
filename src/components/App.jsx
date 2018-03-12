import React,{Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Toolbar from './Toolbar';
import SideBar from './SideBar';
import MainSection from './MainSection';
import $ from 'jquery';

export default class App extends Component {
  state = {
    sideBarOpened: $(window).width() < 600 ? false : true,
    SearchLoading: false,
  };

  render(){
    return (
      <MuiThemeProvider>
        <div>
          <Toolbar
            onSideBarToggled={this._onSideBarToggled.bind(this)} SearchLoading={this.state.searchLoading}
          />
          <SideBar
            sideBarOpened={this.state.sideBarOpened} onSideBarToggled={this._onSideBarToggled.bind(this)}
          />
          <MainSection
            sideBarOpened={this.state.sideBarOpened} onSearchLoading={this._onSearchLoading.bind(this)} onSideBarToggled={this._onSideBarToggled.bind(this)}
          />
        </div>
      </MuiThemeProvider>
    );
  }

  componentDidMount() {
    window.addEventListener("resize", this._updateWindowSize.bind(this));
  }

  _updateWindowSize() {
    this.setState({sideBarOpened: false});
  }

  _onSideBarToggled() {
    const sideBarOpened= !this.state.sideBarOpened;
    this.setState({
      sideBarOpened
    });
  }

  _onSearchLoading (bool) {
    this.setState({
      searchLoading: bool
    });
  }
};

