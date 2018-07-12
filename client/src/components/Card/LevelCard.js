import React from 'react'
import './Card.css'

export const LevelCard = ({level, href, textBg, title, text}) => (
    <div className={`card level-card text-center m-0 ${level}`}>
        <a className={`card-text px-2 bg-${textBg}`} href={href}>
            <b>{title}</b>
        </a>
    </div>
)