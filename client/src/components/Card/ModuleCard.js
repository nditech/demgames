import React from 'react'

export const ModuleCard = ({href, title}) => (
    <div className={`card m-0`}>
        <a href={href}>
            <div>
                <p><b>{title}</b></p>
            </div>
        </a>
    </div>
)