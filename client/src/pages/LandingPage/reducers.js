import { FETCH_MODULES, FETCH_MODULE_NAMES } from './constants';

const initialState = {
	// data: []
	moduleNames: []
};

const myReducer = (state = initialState, action) => {
	const newState = { ...state };
	switch (action.type) {
		// case FETCH_MODULES:
		// 	return {
		// 		...state,
		// 		data: action.val
		// 	};
		case FETCH_MODULE_NAMES:
			return {
				...state,
				moduleNames: action.val
			};

		default:
			return newState;
	}
};

export default myReducer;
