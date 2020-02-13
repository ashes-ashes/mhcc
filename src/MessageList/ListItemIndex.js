import React from 'react'
import ListItem  from './ListItem'

export default function ListItemIndex(props) {

    let { messages } = props;

    return (
        <ul className="message-index">
            {messages.map((message) => {
                return <ListItem message={message} />
            })}
        </ul>
    )
}
