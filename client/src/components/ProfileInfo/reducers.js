import { FETCH_SCORE_DETAIL } from './constants';

const initialState = {
  scoreDetail: [],
};

const myReducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case FETCH_SCORE_DETAIL: state = { ...state, scoreDetail: action.val };
      return state;

    default:
      return newState;
  }
};

export default myReducer;
