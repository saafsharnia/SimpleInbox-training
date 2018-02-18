import React, {Component} from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import ListItem from 'material-ui/List/ListItem';
import {
  blue300,
  deepOrange300,
  pink400,
  purple500,
} from 'material-ui/styles/colors';

export default class DetailedListEmails extends Component {

  render() {
    const styles = this._styles();

    const emails = Object.keys(this.props.listEmails);
    return (
      <div style={styles.mainContainer}>
        {emails.map((num) => {
          const charNum = this.props.listEmails[num].from[0].charCodeAt() - 64;
          var avatarColor = blue300;
          if (charNum <= 10 && charNum > 5) {
            avatarColor = blue300;
          } else if (charNum <= 17) {
            avatarColor = purple500;
          } else if (charNum <= 22) {
            avatarColor = deepOrange300;
          } else if (charNum > 22) {
            avatarColor = pink400;
          }
          return (
            <Card key={"div-" + this.props.date + '-' + [num]}>
              <CardHeader
                actAsExpander={true}
                showExpandableButton={true}
                style={{paddingTop: 0, paddingBottom: 27}}
              >
                <ListItem
                  disabled={true}
                  leftAvatar={<Avatar backgroundColor={avatarColor}>{this.props.listEmails[num].from[0]}</Avatar>}
                >
                  <div style={styles.senderName}>{this.props.listEmails[num].from}</div>
                  <div style={styles.title}>{this.props.listEmails[num].title}</div>
                </ListItem>
              </CardHeader>
              <CardText expandable={true}>
                <div style={styles.expandedText}>{this.props.listEmails[num].content}</div>
              </CardText>
            </Card>
          )
        })}
      </div>
    );
  }

  _styles() {
    return {
      senderName: {
        float: 'left',
        marginRight: 25,
        position: 'inherit',
        width: 180

      },

      title: {
        marginLeft: 20,
        float: 'left'
      },

      mainContainer: {
        margin: 20,
      },

      expandedText: {
        marginLeft: 30,


      }
    }
  }
}