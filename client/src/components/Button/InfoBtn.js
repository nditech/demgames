import React from 'react'
import './Button.css'

export const InfoBtn = ({handleClick}) => (
    <div className="wrap-btn info-btn" onClick={handleClick}>
        <h1 className="btn-icon ml-2"><b>i</b></h1>
    </div>
)