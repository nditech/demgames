import { FETCH_GAME_DATA, FETCH_SCORES } from './constants';

const initialState = {
	gameData: [],
	scores: []
};

const myReducer = (state = initialState, action) => {
	const newState = { ...state };

	switch (action.type) {
		case FETCH_GAME_DATA:
			return {
				...state,
				gameData: action.val
			};
		case FETCH_SCORES:
			return { ...state, scores: action.val };
		default:
			return newState;
	}
};

export default myReducer;
