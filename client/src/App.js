import React, { Fragment } from 'react';
import LandingPage from './pages/LandingPage/LandingPage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Alert from './components/layout/alert';
import 'bootstrap/dist/css/bootstrap.css';
// Redux
import { Provider } from 'react-redux';
import store from './store';

const App = () => {
	return (
		<Provider store={store}>
			<Router>
				<Fragment>
					<div className="App">
						<Route exact path='/' component={LandingPage} />
					</div>
				</Fragment>
			</Router>
		</Provider>
	);
};

export default App;
