import React from 'react'
import ListItem  from './ListItem'

export default function ListItemIndex(props) {

    let { messages, toggleSortByDate, sort, deleteMessage } = props;

    return (
        <table className="message-index">
            <thead>
                    <tr>
                    <th>Sender UUID</th>
                    <th>Content</th>
                    <th>
                        <button onClick={toggleSortByDate} className="head-button">
                            <span>Sent At</span>
                            <span>{sort === "date-desc" ? "▼" : "▲"}</span>
                        </button>
                    </th>
                    </tr>
            </thead>
            <tbody>
            {messages.map((message, idx) => {
                return <ListItem message={message} idx={idx} deleteMessage={
                    () => { deleteMessage(idx) }
                } />
            })}
            </tbody>
        </table>
    )
}
