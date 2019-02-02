import { FETCH_GAME_DATA } from './constants';

const initialState = {
	gameData: []
};

const myReducer = (state = initialState, action) => {
	const newState = { ...state };

	switch (action.type) {
		case FETCH_GAME_DATA:
			return {
				...state,
				gameData: action.val
			};

		default:
			return newState;
	}
};

export default myReducer;
