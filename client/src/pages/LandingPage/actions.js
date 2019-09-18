import { FETCH_GAME_DATA, FETCH_SCORES, AUTH0_LOGIN, AUTH0_LOGOUT} from './constants'; //

export const fetchGameData = (gameData) => ({
	type: FETCH_GAME_DATA,
	val: gameData
});

export const fetchScores = (scores) => ({
	type: FETCH_SCORES,
	val: scores
});

export const fetchAuthDetails = (authDetail) => ({
	type:AUTH0_LOGIN,
	val: authDetail
});

export const clearAuthDetails = (authDetail) => ({
	type:AUTH0_LOGOUT,
	val:authDetail
});
