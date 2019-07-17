import React, { Component } from 'react';
import LandingPage from './pages/LandingPage/LandingPage';

class App extends Component {
	constructor(props){
		super(props);		
	}
	
	render() {
		return (
		
			<div className="App">
				<LandingPage/>
			</div>
		);
	}
}

export default App;
