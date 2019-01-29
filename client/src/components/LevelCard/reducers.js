const initialState = {
	scores: []
};

const myReducer = (state = initialState, action) => {
	const newState = { ...state };
	if (action.type === 'CORRECT_ANS') {
		newState.scores[0] += 10;
	}
	if (action.type === 'WRONG_ANS') {
		if (newState.scores[0]) {
			newState.scores[0] -= 10;
		} else {
			newState.scores[0] = 0;
		}
	}
	return newState;
};

export default myReducer;
