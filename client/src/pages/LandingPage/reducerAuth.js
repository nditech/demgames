import { SET_AUTH0_LOGIN, SET_PLAYER, AUTH0_LOGOUT } from "./constants"; //,

const initialState = {
  authDetail: {
    player_given_name: "",
    player_family_name: "",
    player_email: "",
    player_username: "",
    player_picture: "",
    player_gender: ""
  },
  selectedPlayer: {
    firstName: "",
    middleName: "",
    lastName: "",
    userName: "",
    email: "",
    dateOfBirth: "",
    gender: "",
    country: "",
    city: "",
    program: ""
  }
};

const reducerAuth = (state = initialState, action) => {
  const newState = { ...state };
  console.log(newState);

  switch (action.type) {
    case SET_PLAYER:
      state = { ...state, selectedPlayer: action.val };
      return state;

    case SET_AUTH0_LOGIN:
      state = { ...state, authDetail: action.val };
      return state;

    case AUTH0_LOGOUT:
      state = { ...state, authDetail: action.val };
      console.log(action.val);
      console.log(state);
      console.log(initialState);
      return state;
    default:
      return state;
  }
};

export default reducerAuth;