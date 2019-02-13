import { combineReducers } from 'redux';
import landingPageReducer from './pages/LandingPage/reducers';

export const rootReducer = combineReducers({
	gameData: landingPageReducer
});

export default rootReducer;
