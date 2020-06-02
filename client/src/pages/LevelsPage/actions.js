import { AUTH0_LOGIN, AUTH0_LOGOUT} from './constants'; //

export const fetchAuthDetails = (authDetail) => ({
	type:AUTH0_LOGIN,
	val: authDetail,
});

export const clearAuthDetails = (authDetail) => ({
	type:AUTH0_LOGOUT,
	val:authDetail,
});
