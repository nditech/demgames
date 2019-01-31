import { combineReducers } from 'redux';
import landingPageReducer from './pages/LandingPage/reducers';
import levelsPageReducer from './pages/LevelsPage/reducers';
import questionsReducer from './pages/QuestionsAnsPage/reducers';

export const rootReducer = combineReducers({
	moduleData: landingPageReducer,
	levelsData: levelsPageReducer,
	questionsData: questionsReducer
});

export default rootReducer;
