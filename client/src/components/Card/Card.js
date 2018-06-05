import React from 'react';
import './Card.css';

export const Card = ({href, img, alt, title, text}) => (
    <div className="card m-0">
        <a href={href}><img className="card-img-top m-0" src={img} alt={alt}/></a>
        <a className="card-text px-2" href={href}>
            <p><b>{title}</b></p>
            <p><small>{text}</small></p>
        </a>
    </div>
)