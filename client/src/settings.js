let config = {};

if (process.env.NODE_ENV === 'development') {
	config = { baseUrl: '' };
} else if (process.env.NODE_ENV === 'production') {
	config = { baseUrl: '' };
}

export { config };
