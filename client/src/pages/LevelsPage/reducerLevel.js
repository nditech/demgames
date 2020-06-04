import { AUTH0_LOGIN, AUTH0_LOGOUT } from './constants';

const reducerLevelAuth = (state = {}, action) => {
  switch (action.type) {
    case AUTH0_LOGIN:

      ({ ...state, authDetail: action.val });
      return state;
    case AUTH0_LOGOUT:

      ({ ...state, authDetail: action.val });
      return state;
    default:
      return state;
  }
};

export default reducerLevelAuth;
