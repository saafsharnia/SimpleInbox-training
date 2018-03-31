import React,{Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Toolbar from './Toolbar';
import SideBar from './SideBar';
import MainSection from './MainSection';
import $ from 'jquery';

export default class App extends Component {
  state = {
    sideBarOpened: $(window).width() < 600 ? false : true,
    SearchLoading: false,
    startDialogOpened: true
  };

  render(){
    return (
      <MuiThemeProvider>
        <div>
            <Dialog
                title='Simple Inbox Project'
                actions={
                    <FlatButton
                        label="OK"
                        primary={true}
                        onClick={this._onDialogClose.bind(this)}
                    />
                }
                open={this.state.startDialogOpened}
                onRequestClose={this._onDialogClose.bind(this)}
            >
              This project is under development and is constantly updating.
            </Dialog>
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

  _onDialogClose() {
    this.setState({startDialogOpened: false});
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

