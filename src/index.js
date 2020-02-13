import React, { Component } from 'react';
import { render } from 'react-dom';
import './reset.css';
import './style.css';

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
    this.toggleSortByDate = this.toggleSortByDate.bind(this);
  }

  sortMessages() {
    switch (this.state.sort) {
      case "date-asc":
        this.setState({
          messages: this.state.messages.sort((a, b) => {
            return Date.parse(a.sentAt) - Date.parse(b.sentAt)
          })})
        break;
    
      case "date-desc":
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

  toggleSortByDate(order) {
    if (this.state.sort === "date-desc") {
      this.setState({sort: "date-asc"})
    } else {
      this.setState({sort: "date-desc"})
    }

    this.sortMessages();
  }

  render() {

    let {messages, sort} = this.state;

    return <div class="app">
      <ListItemIndex messages={messages} toggleSortByDate={this.toggleSortByDate} sort={sort}/>
    </div>;
  }
}

render(<App />, document.getElementById('root'));
