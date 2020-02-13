import React from 'react'
import ListItem  from './ListItem'

export default function ListItemIndex(props) {

    let { messages } = props;

    return (
        <ul>
            {messages.map((message) => {
                return <ListItem message={message} />
            })}
        </ul>
    )
}
