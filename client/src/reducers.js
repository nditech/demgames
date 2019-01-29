import { combineReducers } from 'redux';
import landingPageReducer from './pages/LandingPage/reducers';
import levelsPageReducer from './pages/LevelsPage/reducers';
import scoresReducer from './components/LevelCard/reducers';

export default combineReducers({
	landingPageReducer,
	levelsPageReducer,
	scoresReducer
});
