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
      sort: null,
      page: 0,
      numPages: Math.ceil(filteredMessages.length/5)
    }

    this.sortMessages = this.sortMessages.bind(this);
    this.toggleSortByDate = this.toggleSortByDate.bind(this);
    this.pageForward = this.pageForward.bind(this);
    this.pageBack = this.pageBack.bind(this);
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
      this.setState({sort: "date-asc"}, this.sortMessages());
    } else {
      this.setState({sort: "date-desc"}, this.sortMessages());
    }

  }

  pageForward() {
    if (this.state.page+1 < this.state.numPages) {
      this.setState({page: this.state.page+1})
    }
  }

  pageBack() {
    if (this.state.page > 0) {
      this.setState({page: this.state.page-1})
    }
  }

  render() {

    let {messages, page, numPages, sort} = this.state;
    let {toggleSortByDate, pageForward, pageBack} = this;

    return <div class="app">
      <ListItemIndex messages={messages.slice(page*numPages, page*numPages+5)} toggleSortByDate={toggleSortByDate} sort={sort}/>
      <div className="paginator">
        <button className="page-button" onClick={pageBack}>❮</button>
        <span>Page {page+1} of {numPages}</span>
        <button className="page-button" onClick={pageForward}>❯</button>
      </div>
    </div>;
  }
}

render(<App />, document.getElementById('root'));
