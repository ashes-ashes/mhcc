import React from 'react'

export default function ListItem(props) {

    let { sentAt, content, senderUuid, idx} = props.message;

    sentAt = new Date(sentAt).toLocaleString("en-us", {
        dateStyle: "full",
        timeStyle: "medium"
    });

    return (
        <tr className="message-list-item" key={idx}>
            <td className="sender-uuid">{senderUuid}</td>
            <td className="content">{content}</td>
            <td className="sent-at">{sentAt}</td>
            <td><button className="delete-button" onClick={props.deleteMessage}>✖</button></td>
        </tr>
    )
}
