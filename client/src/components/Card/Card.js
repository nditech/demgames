import React from 'react';
import './Card.css';

export const Card = ({img, alt, title}) => (
    <div className="card">
        <img className="card-img-top m-0" src={img} alt={alt}/>
        <div className="card-body text-center">
            <h5 className="card-title">{title}</h5>
        </div>
    </div>
)