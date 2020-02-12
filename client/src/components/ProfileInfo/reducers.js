import { FETCH_SCORE_DETAIL, FETCH_ROUTE_DETAIL } from "./constants";

const initialState = {
  scoreDetail: [],
  routeDetail: {}
};

const myReducer = (state = initialState, action) => {
  const newState = { ...state };

  console.log(newState);

  switch (action.type) {
    case FETCH_SCORE_DETAIL:
      state = { ...state, scoreDetail: action.val };
      return state;

    case FETCH_ROUTE_DETAIL:
      state = { ...state, routeDetail: action.val };
      return state;

    default:
      return newState;
  }

  console.log(newState);
};

export default myReducer;
