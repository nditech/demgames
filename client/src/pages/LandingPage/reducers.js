const initialState = {
	data: []
};

const myReducer = (state = initialState, action) => {
	const newState = { ...state };
	switch (action.type) {
		case 'FETCH_MODULES':
			return { ...state, data: action.val };
		default:
			break;
	}
	return newState;
};

export default myReducer;
