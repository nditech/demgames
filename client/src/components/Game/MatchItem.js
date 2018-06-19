import React from 'react'
import './MatchItem.css'

export const MatchItem = ({id, type, name, text, handleClick, selectedQ, selectedA}) => (
    <div className={(name === selectedQ ? "question-selected" : null) || (name === selectedA ? "answer-selected" : null)} data-id={id} data-type={type} data-name={name} onClick={() => handleClick(type, id)}>
        {text}
    </div>
)