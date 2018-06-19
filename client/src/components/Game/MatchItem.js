import React from 'react'
import './MatchItem.css'

export const MatchItem = ({name, selectedQ, selectedA, id, type, text, handleClick}) => (
    <div className={name === selectedQ ? "selected-question" : null || name === selectedA ? "selected-answer" : null || name === 'done' ? "done" : null} data-id={id} data-type={type} name={name} onClick={() => handleClick(type, id, name)}>
        {text}
    </div>
)