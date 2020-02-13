import React from 'react'

export default function ListItem(props) {

    let { sentAt, content, senderUuid } = props.message;

    sentAt = new Date(sentAt).toLocaleString({
        dateStyle: "full",
    });

    return (
        <li className="message-list-item">
            <div>{senderUuid}</div>
            <div>{content}</div>
            <div>{sentAt}</div>
        </li>
    )
}
