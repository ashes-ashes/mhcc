import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';

import ListItemIndex from './MessageList/ListItemIndex';

// This is the list of messages.
import { messages } from './data.json';

class App extends Component {

  render() {

    return <div>
      <ListItemIndex messages={messages}/>
    </div>;
  }
}

render(<App />, document.getElementById('root'));
