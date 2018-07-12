import React from 'react'
import './Wrap.css'

export const Wrap = ({children}) => (
    <div className="wrap">
        <div className="phone-wrap">
            {children}
        </div>
    </div>
)