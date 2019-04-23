import React from 'react'

export default function RateImageButton(props) {

    function sendNumber() {
        props.assignRating(props.number)
    }

    return(
        <button onClick={sendNumber}>{props.number}</button>
    )
}
