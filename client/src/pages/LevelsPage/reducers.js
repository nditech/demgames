import { FETCH_LEVELS, FETCH_MODULE_NAMES, FETCH_CURRENT_SCORES, FETCH_PAR_SCORES, UPDATE_SCORE } from './constants';
const initialState = {
	levels: [],
	moduleNames: [],
	currentScores: [],
	parScores: [],
	updatedScores: []
};

const myReducer = (state = initialState, action) => {
	const newState = { ...state };
	switch (action.type) {
		case FETCH_CURRENT_SCORES:
			return {
				...state,
				currentScores: action.val
			};
		case FETCH_PAR_SCORES:
			return {
				...state,
				parScores: action.val
			};

		default:
			return newState;
	}
};

export default myReducer;
