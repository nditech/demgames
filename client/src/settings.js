let config = {};

if (process.env.NODE_ENV === 'development') {
	config = { baseUrl: 'https://localhost:9000' };
} else if (process.env.NODE_ENV === 'production') {
	config = { baseUrl: '' };
}

export { config };
