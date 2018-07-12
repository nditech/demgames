import React from 'react'
import './Card.css'

export const ModuleCard = ({href, title}) => (
    <div className={`card module-card`}>
        <a href={href}>
            <div className="card-text text-center">
                <b>{title}</b>
            </div>
        </a>
    </div>
)