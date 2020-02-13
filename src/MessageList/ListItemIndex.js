import React from 'react'
import ListItem  from './ListItem'

export default function ListItemIndex(props) {

    let { messages, toggleSortByDate, sort } = props;

    return (
        <table className="message-index">
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
            {messages.map((message) => {
                return <ListItem message={message} />
            })}
        </table>
    )
}
