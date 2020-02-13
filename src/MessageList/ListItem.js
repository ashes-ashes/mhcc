import React from 'react'

export default function ListItem(props) {

    let { sentAt, uuid, content, senderUuid } = props.message;

    return (
        <li>
            <div>{senderUuid}</div>
            <div>{content}</div>
            <div>{sentAt}</div>
        </li>
    )
}
