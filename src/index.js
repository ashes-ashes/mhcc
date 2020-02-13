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
      messages: filteredMessages
    }
  }

  render() {

    return <div>
      <ListItemIndex messages={this.state.messages}/>
    </div>;
  }
}

render(<App />, document.getElementById('root'));
