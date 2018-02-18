import React, {Component} from 'react';
import {Card, CardHeader} from 'material-ui/Card';
import FontIcon from 'material-ui/FontIcon';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import EditorAttachFile from 'material-ui/svg-icons/editor/attach-file';
import ContentDeleteSweep from 'material-ui/svg-icons/content/delete-sweep';
import IconButton from 'material-ui/IconButton';
import EmailActions from '../redux/actions/EmailActions'
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import $ from 'jquery';

export default class Compose extends Component {

  render () {
    const styles = this._styles();

    return (
        <Card style={styles.card}>
          <CardHeader
            title={<div style={{width: styles.card.width - 35, position: 'fixed'}}><FontIcon className="material-icons" style={styles.cardHeader.emailFontIcon}>email</FontIcon>
              <IconButton style={styles.cardHeader.exitIcon} onClick={this._onExitClicked.bind(this)}><NavigationClose color={$(window).width() > 600 ? 'white' : 'gray'}></NavigationClose></IconButton>
            </div>
            }
            style={styles.cardHeader.headerbar}
          />
          <TextField ref="composeTo" hintText="To:" style={styles.cardTextField.to} underlineShow={false} multiLine={true} />
          <Divider/>
          <TextField ref="composeTitle" hintText="Subject" style={styles.cardTextField.subject} underlineShow={false} multiLine={true}/>
          <TextField ref="composeContent" hintText="Say something" style={styles.cardTextField.content} underlineShow={false} multiLine={true}/>
          <RaisedButton onClick={this._onSendClicked.bind(this)} label="Send" primary={true} buttonStyle={styles.sendButton.buttonStyle} style={styles.sendButton.style}/>
          <IconButton tooltip="Attach files" style={styles.attachButton.button} tooltipPosition="top-right">
            <EditorAttachFile style={styles.attachButton.icon}/>
          </IconButton>
          <IconButton tooltip="Discard draft" style={styles.deleteButton.button} tooltipPosition="top-right">
            <ContentDeleteSweep style={styles.deleteButton.icon}/>
          </IconButton>
        </Card>
    );
  }

  _onExitClicked() {
    this.props.onComposeToggled();
  }
  _onSendClicked() {
    const to = this.refs.composeTo.getValue();
    const title = this.refs.composeTitle.getValue();
    const content = this.refs.composeContent.getValue();
    EmailActions.composeEmail(to, title, content);
    this.props.onEmailSent();
    this.props.onComposeToggled();
  }

  _styles() {
    return {
      card: {
        position: 'fixed',
        right : $(window).width() > 600 ? 90 : 0,
        bottom: 0,
        width: $(window).width() > 600 ? 400 : $(window).width(),
        height: $(window).width() > 600 ? 450 : $(window).height(),
        zIndex: $(window).width() > 600 ? 200 : 2000
      },

      cardHeader: {
        headerbar: {
          backgroundColor: $(window).width() > 600 ? 'black' : 'white',
          height: 35,
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
          padding: 7,
          paddingLeft: 12
         },

        emailFontIcon: {
          color: $(window).width() > 600 ? 'white' : 'gray',
          fontSize: 24,
          padding: 0,
          margin: 0
        },

        exitIcon: {
          margin: 0,
          padding: 0,
          height: 2,
          width: 2,
          right: 5,
          float: 'right'
        }
      },
      cardHeaderExitIcon: {
        color: $(window).width() > 600 ? 'white' : 'gray',
        float: 'right',
        height: 19,
        width: 19
      },

      cardTextField: {
        to: {
          width: 350,
          marginRight: 20,
          marginLeft: 20,
          marginBottom: 0,
          fontSize: 12
        },

        subject: {
          width: 350,
          marginRight: 20,
          marginLeft: 20,
          marginBottom: 0,
          fontSize: 15,
          fontWeight: 'bold'
        },

        content: {
          width: 350,
          marginRight: 20,
          marginLeft: 20,
          marginBottom: 0,
          fontSize: 12
        }
      },

      sendButton: {
        style: {
          margin: 12,
          marginRight: -15
        },

        buttonStyle: {
          width: 65,
          height: 35,
          position: 'absolute',
          bottom: 10
        }
      },

      attachButton: {
        button: {
          position: 'absolute',
          bottom: 5,
          float: 'left'
        },

        icon: {
          margin: 0,
        }
      },

      deleteButton: {
        button: {
          position: 'absolute',
          bottom: 5,
          right: 12
        },

        icon: {
          margin: 0
        }
      }
    }
  }
}