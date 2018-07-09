import React from 'react'
import './LevelCard.css'

export const LevelCard = ({level, href, bgcolour, title, text}) => (
    <div className={`card level-card m-0 ${level}`}>
        {/* <a href={href}><img className="card-img-top m-0" src={img} alt={alt}/></a> */}
        <a className={`card-text px-2 bg-${bgcolour}`} href={href}>
            <div>
                <p><b>{title}</b></p>
                <p><small>{text}</small></p>
            </div>
        </a>
    </div>
)