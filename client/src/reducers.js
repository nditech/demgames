import { combineReducers } from 'redux';
import landingPageReducer from './pages/LandingPage/reducers';
import LandingPage from './pages/LandingPage/LandingPage';
import landingPageAuthReducer from './pages/LandingPage/reducerAuth';

export const rootReducer = combineReducers(
	{
			gameData: landingPageReducer,
			authDetail:landingPageAuthReducer
	}
);

export default rootReducer;
