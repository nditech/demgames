const initialState = {
	moduleName: '',
	levels: []
};

const myReducer = (state = initialState, action) => {
	const newState = { ...state };
	if (action.type === 'FETCH_MODULE_NAME') {
		newState.moduleName = 'abcd';
	}
	if (action.type === 'FETCH_MODULE_LEVELS') {
		newState.levels = [ 1, 2 ];
	}
	return newState;
};

export default myReducer;
