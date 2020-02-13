import React from 'react'
import ListItem  from './ListItem'

export default function ListItemIndex(props) {

    let { messages } = props;

    return (
        <table className="message-index">
            <tr>
                <th>Sender UUID</th>
                <th>Content</th>
                <th>Sent At</th>
            </tr>
            {messages.map((message) => {
                return <ListItem message={message} />
            })}
        </table>
    )
}
