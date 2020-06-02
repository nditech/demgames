import { AUTH0_LOGIN, AUTH0_LOGOUT } from './constants'; // , 

const initialState = {
    authDetail:{
				player_given_name:"",
				player_family_name:"",
				player_email:"",
				player_username:"",
				player_picture:"",
				player_gender:"",
	},
};

const reducerAuth = (state = initialState, action) => {
		const newState = { ...state };	
	switch (action.type) {
		case AUTH0_LOGIN:state = {...state, authDetail: action.val};
			return state;
		
		case AUTH0_LOGOUT:
			state = {...state, authDetail: action.val};
			return (state);
		default:
			return state;
	}	
};

export default reducerAuth;
