import { FETCH_QUESTIONS, FETCH_PAR_SCORES, UPDATE_SCORE } from './constants';
const initialState = {
	questions: [],
	score: 0,
	parScores: []
};

const myReducer = (state = initialState, action) => {
	const newState = { ...state };
	switch (action.type) {
		case FETCH_QUESTIONS:
			return {
				...state,
				questions: action.val
			};

		default:
			return newState;
	}
};

export default myReducer;
