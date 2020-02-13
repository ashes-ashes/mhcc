import React from 'react'

export default function Button(props) {

    let {func, text} = props

    return (
        <button onClick={func}>{text}</button>
    )
}
