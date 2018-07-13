import React from 'react'
import './Card.css'

export const ModuleCard = ({href, module, colour, title}) => (
    <div className={`card module-card`}>
        <a href={href}>
            <div className="text-center"><b>{title}</b></div>
            
        </a>
        <div className={`module-glass glass-${colour}`}></div>
        <div className={`module-bg ${module}`}></div>
        
        {/* <a href={href} className={`card-text text-center bg-${textBg}`}></a> */}
    </div>
)