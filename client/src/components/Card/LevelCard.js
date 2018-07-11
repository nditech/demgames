import React from 'react'
import './LevelCard.css'

export const LevelCard = ({level, href, textBg, title, text}) => (
    <div className={`card level-card m-0 ${level}`}>
        <a className={`card-text px-2 bg-${textBg}`} href={href}>
            <div>
                <p><b>{title}</b></p>
                <p><small>{text}</small></p>
            </div>
        </a>
    </div>
)