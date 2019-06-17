import React, { Component } from 'react';
import LandingPage from './pages/LandingPage/LandingPage';
import {Routes} from './components/routes';

class App extends Component {
	render() {
		return (
			<div className="App">
                <LandingPage />
            </div>
		);
	}
}

export default App;
