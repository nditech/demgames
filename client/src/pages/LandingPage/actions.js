import { FETCH_GAME_DATA } from './constants';

export const fetchGameData = (gameData) => ({
	type: FETCH_GAME_DATA,
	val: gameData
});
