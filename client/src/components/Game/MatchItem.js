import React from 'react'
import './MatchItem.css'

export const MatchItem = ({id, type, name, text, handleClick, selectedQ, selectedA}) => (
    <div className={type === 'answer'? ('col-12 col-md-6 p-0') : ('col p-0')}>
        <div className="card mx-1">
            <div className="card-body text-center">
                <div className={(name === selectedQ ? "question-selected" : null) || (name === selectedA ? "answer-selected" : null)} data-id={id} data-type={type} data-name={name} onClick={() => handleClick(type, id)}>
                    {text}
                </div>
            </div>
        </div>
    </div>
)