import React from 'react'

export default function ListItem(props) {

    let { sentAt, content, senderUuid } = props.message;

    sentAt = new Date(sentAt).toLocaleString("en-us", {
        dateStyle: "full",
        timeStyle: "medium"
    });

    return (
        <tr className="message-list-item" key={Math.random()}>
            <td className="sender-uuid">{senderUuid}</td>
            <td className="content">{content}</td>
            <td className="sent-at">{sentAt}</td>
        </tr>
    )
}
