import React from 'react'
import './Card.css'

export const ModuleCard = ({href, module, textBg, title}) => (
    <div className={`card module-card ${module}`}>
        <a href={href} className={`card-text text-center bg-${textBg}`}>
            <b>{title}</b>
        </a>
    </div>
)