const initialState = {
	scores: [ 0, 0, 0, 0 ]
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

// const initialState = {
// 	scores: 0
// };

// const myReducer = (state = initialState, action) => {
// 	const newState = { ...state };
// 	if (action.type === 'CORRECT_ANS') {
// 		newState.scores += 30;
// 	}
// 	if (action.type === 'WRONG_ANS') {
// 		newState.scores -= 10;
// 	}
// 	return newState;
// };

// export default myReducer;
