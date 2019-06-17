import React from 'react';
import logo from './logo.svg';
import './App.css';

import {default as Routes} from './routes';
import LandingPage from './components/LandingPage';

function App() {
    const childProps={};
    return (
        <div className="App">
            <Routes childProps={childProps} />
        </div>
    );
}

export default App;
