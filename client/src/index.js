import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import LandingPage from '../src/pages/LandingPage/LandingPage';
import LevelsPage from './pages/LevelsPage/LevelsPage';
import QuestionsAnsPage from './pages/QuestionsAnsPage/QuestionsAnsPage';
import ResultPage from './pages/ResultPage/ResultPage';
import CorrectAnswerInfo from './components/CorrectAnswerInfo';
import { Provider } from 'react-redux';
import ProfileInfo from './components/ProfileInfo';
import store from './store';
import ScenarioQuesAns from './pages/ScenarioBased/ScenarioQuesAns';
import admin from './components/admin/admin';
import UpdatePlayer from './components/Update/UpdateProfile';
import Register from './components/Add/Register';
import AddGame from './components/Add/AddGame';
import AddQuestion from './components/Add/AddQuestion';
import AddChoices from './components/Add/AddChoices';
import Auth from './Auth';
import Callback from './pages/LandingPage/callback';
import RemovePlayer from './components/Remove/RemovePlayer';
import RemoveChoice from './components/Remove/RemoveChoice';
import RemoveQuestion from './components/Remove/RemoveQuestion';
import UpdateGame from './components/Update/UpdateGame';
import UpdateQuestion from './components/Update/UpdateQuestion';
import UpdateChoice from './components/Update/UpdateChoice';


    const Routes = ()=> (
    	<Router>
	    	<div>
		    	<Route path="/" exact component={App} />
                <Route path="/landingpage" exact component={LandingPage} />
			    <Route path="/module/:moduleId/level/:levelId/questions/" exact component={QuestionsAnsPage} />
			    <Route path="/module/:moduleId/levels" exact component={LevelsPage} />
			    <Route path="/module/scenario/:moduleId/level/:levelId/questions" exact component={ScenarioQuesAns} />
			    <Route path="/results" exact component={ResultPage} />
                <Route path="/callback" exact component={Callback} />
			    <Route path="/info" exact component={CorrectAnswerInfo} />
			    <Route path="/profile" exact component={ProfileInfo} />
				<Route path="/admin" exact component={admin}/>
				<Route path="/UpdatePlayer" exact component={UpdatePlayer} />
				<Route path="/registerplayer" exact component={Register} />
				<Route path="/addgame" exact component={AddGame} />
				<Route path="/addquestion" exact component={AddQuestion} />
				<Route path="/addchoices" exact component={AddChoices}/>
				<Route path="/removeplayer" exact component={RemovePlayer} />
				<Route path="/removequestion" exact component={RemovePlayer} />
				<Route path="/updatequestion" exact component={UpdatePlayer} />
				<Route path="/updategame" exact component={UpdateGame} />
				<Route path="/updatechoice" exact component={UpdateChoice} />
		    </div>
	    </Router>
    );

    ReactDOM.render(

	    <Provider store={store}>
		    <Routes />
        </Provider>,
        
	    document.getElementById('root')
    );


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
