import { FETCH_GAME_DATA, FETCH_SCORES } from './constants';

export const fetchGameData = (gameData) => ({
	type: FETCH_GAME_DATA,
	val: gameData
});

export const fetchScores = (scores) => ({
	type: FETCH_SCORES,
	val: scores
});
