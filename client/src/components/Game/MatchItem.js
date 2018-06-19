import React from 'react'
import './MatchItem.css'

export const MatchItem = ({id, type, name, text, handleClick, selectedQ, selectedA}) => (
    <div className={(name === selectedQ || name === selectedA) ? "selected" : null} data-id={id} data-type={type} data-name={name} onClick={() => handleClick(type, id)}>
        {text}
    </div>
)