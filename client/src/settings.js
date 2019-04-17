let config = {};

if (process.env.NODE_ENV === 'development') {
	config = { baseUrl: 'http://localhost:9000' };
	// 192.168.13.86 is ip of network you are connected to change it with your ip address.
	// config = { baseUrl: 'http://192.168.13.86:9000' };
} else if (process.env.NODE_ENV === 'production') {
	config = { baseUrl: '' };
}

export { config };
