import { FETCH_LEVELS } from './constants';
const initialState = {
	levels: []
};

const myReducer = (state = initialState, action) => {
	const newState = { ...state };
	switch (action.type) {
		case FETCH_LEVELS:
			return {
				...state,
				levels: action.val
			};

		default:
			return newState;
	}
};

export default myReducer;
