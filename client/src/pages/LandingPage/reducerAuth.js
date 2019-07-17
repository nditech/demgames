import { AUTH0_LOGIN, AUTH0_LOGOUT } from './constants'; //, 

const initialState = {
    authDetail:{
		player_given_name:"",
		player_family_name:"",
		player_email:"",
		player_username:"",
		player_picture:"",
		player_gender:""
	}
};

const reducerAuth = (state = initialState, action) => {
	
	//console.log(action.val);

	const newState = { ...state };
	
	console.log(newState);

	switch (action.type) {
		case AUTH0_LOGIN:state = {...state, authDetail: action.val}
			return state;
		//case AUTH0_LOGIN:
			
		//	Object.assign({}, state, {authDetail:action.val});
		//	return state;
		
		case AUTH0_LOGOUT:
			state = {...state, authDetail: action.val}
			//Object.assign({}, state, {authDetail:action.val});
			console.log(action.val);
			console.log(state);
			console.log(initialState);
			return (state);
		default:
			return state;
	}	
};

export default reducerAuth;
