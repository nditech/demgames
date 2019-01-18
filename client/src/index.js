import React from 'react';
import { setGlobal } from 'reactn';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import LevelsPage from './pages/LevelsPage';
import QuestionsAnsPage from './pages/QuestionsAnsPage';

const Routes = () => (
	<Router>
		<div>
			<Route path="/" exact component={App} />
			<Route path="/modules/:moduleId/level/:levelId/questions/:questionId" exact component={QuestionsAnsPage} />
			<Route path="/modules/:id/levels" exact component={LevelsPage} />
		</div>
	</Router>
);

ReactDOM.render(<Routes />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
