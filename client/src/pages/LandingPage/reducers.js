import { FETCH_MODULES } from './constants';

const initialState = {
	data: []
};

const myReducer = (state = initialState, action) => {
	const newState = { ...state };
	switch (action.type) {
		case FETCH_MODULES:
            return { ...state,
                 data: action.val };

		default:
			return newState;
	}
};

export default myReducer;
