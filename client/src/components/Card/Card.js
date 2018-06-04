import React from 'react';
import './Card.css';

export const Card = ({href, img, alt, title}) => (
    <div className="card">
        <div className="card-header text-center p-1">{title}</div>
        <a href={href}><img className="card-img-top m-0" src={img} alt={alt}/></a>
    </div>
)