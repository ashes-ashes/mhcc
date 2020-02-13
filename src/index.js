import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';
import './reset.css';

import ListItemIndex from './MessageList/ListItemIndex';

// This is the list of messages.
import { messages } from './data.json';

class App extends Component {

  constructor(props) {
    super(props);

    let messageComparisonHash = {};
    let filteredMessages = [];

    messages.forEach((message) => {

      let { uuid } = message;

      // add message into the comparison hash @ uuid (creating array if it's
      // the first) - only add it to filteredMessages if it's not a duplicate
      if (messageComparisonHash[uuid] === undefined) {
        filteredMessages.push(message);
        messageComparisonHash[uuid] = [message]
      } else if (!messageComparisonHash[uuid].some((hashMsg) => { 
        return hashMsg.uuid === uuid
      })) {
        filteredMessages.push(message);
        messageComparisonHash[uuid].push(message)
      }

    })

    this.state = {
      messages: filteredMessages,
      sort: null
    }

    this.sortMessages = this.sortMessages.bind(this);
  }

  sortMessages(order) {
    switch (order) {
      case "asc":
        this.setState({
          messages: this.state.messages.sort((a, b) => {
            return Date.parse(a.sentAt) - Date.parse(b.sentAt)
          })})
        break;
    
      case "desc":
        this.setState({
          messages: this.state.messages.sort((a, b) => {
            return Date.parse(b.sentAt) - Date.parse(a.sentAt)
          })
        })
        break;
      default:
        break;
    }
  }

  render() {
    return <div>
      <ListItemIndex messages={this.state.messages}/>
    </div>;
  }
}

render(<App />, document.getElementById('root'));
