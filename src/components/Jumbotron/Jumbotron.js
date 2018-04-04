import React from 'react';
import './Jumbotron.css';

const Jumbotron = ({children}) => (
    <div className="jumbotron jumbotron-fluid">
        {children}
    </div>
)

export default Jumbotron;