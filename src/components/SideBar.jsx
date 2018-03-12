import React, {Component} from 'react';
import {List, ListItem} from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import Delete from 'material-ui/svg-icons/content/delete-sweep';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import ContentPageActions from '../redux/actions/ContentPageActions';
import EmailActions from '../redux/actions/EmailActions';
import $ from 'jquery';

export default class SideBar extends Component {

  render() {
    const styles = this._styles();
    return (
      <Drawer open={this.props.sideBarOpened}
              width={256}
              style={styles.drawer}
              docked={screen.width > 600}
              onRequestChange={() => this.props.onSideBarToggled()}
      >
        <div style={{paddingTop: 70}}>
          <List>
            <ListItem primaryText="Inbox" leftIcon={<ContentInbox />}
                      onClick={() => {
                        if ($(window).width() < 600) {
                          this.props.onSideBarToggled();
                        }
                        EmailActions.getListEmails();
                      }}/>
            <ListItem primaryText="About us" leftIcon={<ContentSend />}
                      onClick={() => this._getPage('aboutUs')}
            />
            <ListItem primaryText="TermsAndPrivacy" leftIcon={<ContentDrafts />}
                      onClick={() => this._getPage('termsAndPrivacy')}
            />
          </List>
          <Divider />
          <List>
            <ListItem primaryText="Trash" rightIcon={<Delete />} />
            <ListItem primaryText="Spam" rightIcon={<ActionInfo />} />
          </List>
        </div>
      </Drawer>
    );
  }

  _getPage(pageName) {
    if ($(window).width() < 600) {
      console.log('it is clicked');
      this.props.onSideBarToggled();
    }
    ContentPageActions.getPage(pageName);
  }


  _styles() {
    return {
      drawer: {
        zIndex: 100,
      }
    }
  }
};


