import React from "react";
import ReactDOM from "react-dom";
import { Route, Switch, BrowserRouter as Router, withRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import LandingPage from "../src/pages/LandingPage/LandingPage";
import LevelsPage from "./pages/LevelsPage/LevelsPage";
import QuestionsAnsPage from "./pages/QuestionsAnsPage/QuestionsAnsPage";
import ResultPage from "./pages/ResultPage/ResultPage";
import CorrectAnswerInfo from "./components/CorrectAnswerInfo";
import { Provider } from "react-redux";
import ProfileInfo from "./components/ProfileInfo";
import store from "./store";
import ScenarioQuesAns from "./pages/ScenarioBased/ScenarioQuesAns";
import admin from "./components/admin/admin";
import UpdatePlayer from "./components/Update/UpdateProfile";
import Register from "./components/Add/Register";
import AddGame from "./components/Add/AddGame";
import AddQuestion from "./components/Add/AddQuestion";
// import AddChoices from './components/Add/AddChoices';
import Auth from "./Auth";
import Callback from "./pages/LandingPage/callback";
import ScenarioLevels from "./pages/ScenarioLevels";
import RemovePlayer from "./components/Remove/RemovePlayer";
import RemoveChoice from "./components/Remove/RemoveChoice";
import RemoveQuestion from "./components/Remove/RemoveQuestion";
import UpdateGame from "./components/Update/UpdateGame";
import UpdateQuestion from "./components/Update/UpdateQuestion";
import UpdateChoice from "./components/Update/UpdateChoice";
import ProfileHeader from "./components/ProfileHeader/ProfileHeader";
import { connect } from 'react-redux'
import PropTypes from "prop-types";


const auth0 = new Auth();

const Routes = ({store} ) => (
  <Router>
       <Switch>
      <>
        <ProfileHeader />

        <Route
          exact
          path={`/:${store.getState().scoreDetail.routeDetail.name}/module/:moduleId/level/:levelId/questions/`}
          component={QuestionsAnsPage}
        />
        
        <Route
          exact
          path={`/:${store.getState().scoreDetail.routeDetail.name}/module/scenario/:moduleId/levels`}
          component={ScenarioLevels}
        />
        
        <Route 
          exact 
          path={`/:${store.getState().scoreDetail.routeDetail.name}/module/:moduleId/levels`} 
          component={LevelsPage} 
	      />
        <Route path={`/:${store.getState().scoreDetail.routeDetail.name}/info`} exact component={CorrectAnswerInfo} />
        
        

        <Route  exact path={`/:${store.getState().scoreDetail.routeDetail.name}/profile`} component={ProfileInfo} />

        <Route exact path={`/:${store.getState().scoreDetail.routeDetail.name}/landingpage`} component={LandingPage} />
        <Route exact path={`/:${store.getState().scoreDetail.routeDetail.name}/result`} component={ResultPage} />
        <Route path="/callback" exact component={Callback} />
        <Route 
          exact 
          path={`/:${store.getState().scoreDetail.routeDetail.name}/admin`} component={ 
            auth0.getProfile() &&
            auth0.getProfile()["http://demGames.net/roles"] &&
            auth0.getProfile()["http://demGames.net/roles"][0] === "admin" ? admin:LandingPage
          } 
        />
        <Route exact path={`/:${store.getState().scoreDetail.routeDetail.name}`} component={LandingPage} /> 
              
        <Route exact path="/" component={App} />
        
      </>
    </Switch>
  </Router>
);

const mapStateToProps = store => ({
    cohortData: store.gameData.cohortData,
    scoreDetail : store.scoreDetail
});

//Dispatch action to fetch game data and scores.
const mapDispatchToProps = dispatch => {
  return {
    getGameData: gameData => dispatch(fetchGameData(gameData)),
    getScores: scores => dispatch(fetchScores(scores)),
    getCohorts:cohortData=>dispatch(fetchCohorts(cohortData)),
    setAuth: authDetail => dispatch(fetchAuthDetails(authDetail)),

    setScoreDetail: scoreDetail => dispatch(fetchScoreDetail(scoreDetail))
  };
};

Routes.propTypes = {
    getGameData: PropTypes.func,
    getScores: PropTypes.func,
    gameData: PropTypes.object,
    authDetail: PropTypes.object,   
    scoreDetail: PropTypes.object,
    cohortData: PropTypes.object,
    getCohorts: PropTypes.func,
};



export default connect(mapStateToProps, mapDispatchToProps)(Routes);



ReactDOM.render(
  <Provider store={store}>
    <Routes store={store}/>
  </Provider>,
  document.getElementById("root")
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
