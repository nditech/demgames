import {
  FETCH_GAME_DATA,
  FETCH_SCORES,
  SET_AUTH0_LOGIN,
  AUTH0_LOGOUT,
  FETCH_COHORT,
  SET_PLAYER
} from "./constants"; //

export const fetchGameData = gameData => ({
  type: FETCH_GAME_DATA,
  val: gameData
});

export const fetchScores = scores => ({
  type: FETCH_SCORES,
  val: scores
});

export const fetchAuthDetails = authDetail => ({
  type: SET_AUTH0_LOGIN,
  val: authDetail
});

export const clearAuthDetails = authDetail => ({
  type: AUTH0_LOGOUT,
  val: authDetail
});

export const fetchCohorts = cohortData => ({
  type: FETCH_COHORT,
  val: cohortData
});

export const setPlayersDetails = selectedPlayer => ({
  type: SET_PLAYER,
  val: selectedPlayer
});
