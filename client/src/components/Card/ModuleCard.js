import React from 'react';

export const ModuleCard = ({href, style, colour, title}) => (
    <a href={href} className={`card module-card`}>
        <div className="text-center module-card-title"><b>{title}</b></div>
        <div className={`module-glass glass-${colour}`}></div>
        <div className={`module-bg ${style}`}></div>
    </a>
);