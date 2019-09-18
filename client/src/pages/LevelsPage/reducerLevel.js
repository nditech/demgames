import { AUTH0_LOGIN, AUTH0_LOGOUT } from './constants'; //, 

const initialState = {
    authDetail:{}
};

const reducerLevelAuth = (state = {}, action) => {
	
	console.log(action.val);

	//const newState = { ...state };
	
	console.log(action.val);

	switch (action.type) {
    
		case AUTH0_LOGIN:
			
			Object.assign({}, state, {authDetail:action.val});
			//console.log(state.authDetail);
			return state;
		case AUTH0_LOGOUT:
	
			Object.assign({}, state, {authDetail:action.val});
			console.log(state.authDetail);
			return state;
		default:
			return state;
	}	
};

export default reducerLevelAuth;
