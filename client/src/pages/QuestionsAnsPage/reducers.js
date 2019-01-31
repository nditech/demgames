import { FETCH_QUESTIONS, CORRECT_ANS, WRONG_ANS } from './constants';
const initialState = {
	questions: [],
	score: 0
};

const myReducer = (state = initialState, action) => {
	const newState = { ...state };
	switch (action.type) {
		case FETCH_QUESTIONS:
			return {
				...state,
				questions: action.val
			};
		// case CORRECT_ANS:
		// 	return {
		// 		...state,
		// 		score: action.val + 10
		// 	};
		// case WRONG_ANS:
		// 	return {
		// 		...state,
		// 		score: action.val - 10
		// 	};
		default:
			return newState;
	}
};

export default myReducer;
