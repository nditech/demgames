import { combineReducers } from 'redux';
import alert from './alert';
import myReducer from '../pages/LandingPage/reducers';

export default combineReducers({
    alert , 
    myReducer
});