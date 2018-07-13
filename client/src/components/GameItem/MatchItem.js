import React from 'react'
import './GameItem.css'

export const MatchItem = ({id, type, name, text, handleClick, selectedQ, selectedA}) => (
    <div className={`mb-2 ${type === 'answer'? ('col-10 col-md-6 p-0') : ('col p-0')}`}>
        <div className="card mx-1 text-center p-0 match-item">
            <div className={`qna ${(name === selectedQ ? 'selected-question' : '') || (name === selectedA ? 'selected-answer' : '')}`} data-id={id} data-type={type} data-name={name} onClick={() => handleClick(type, id)}>
                <div className="m-1">{text}</div>
            </div>
        </div>
    </div>
)