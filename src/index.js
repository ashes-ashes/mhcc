import React, { Component } from 'react';
import { render } from 'react-dom';
import './reset.css';
import './style.css';

import Paginator from './Paginator/Paginator';

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
  
    this.deleteMessage = this.deleteMessage.bind(this);
  }

  deleteMessage(idx) {

    let {messages} = this.state;

    this.setState({
      messages: messages.slice(0, idx).concat(messages.slice(idx+1, messages.length))
    });

  }

  
  // sorts messages according to this.state.sort
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

  // changes this.state.sort from date-desc to date-asc
  // and from anything to date-desc – when this is done, sorts messages
  toggleSortByDate(order) {

    if (this.state.sort === "date-desc") {
      this.setState({sort: "date-asc"}, this.sortMessages());
    } else {
      this.setState({sort: "date-desc"}, this.sortMessages());
    }

  }


  render() {

    let {messages, sort} = this.state;
    let {toggleSortByDate, deleteMessage} = this;

    let listProps = {sort, toggleSortByDate}

    return <div>
      <Paginator messages={messages} deleteMessage={deleteMessage} listProps={listProps}/>
    </div>;
  }
}

render(<App />, document.getElementById('root'));
