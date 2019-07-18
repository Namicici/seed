let serverUrl = {
	PROTOCOL: 'https',}
if (process.env.NODE_ENV == 'development') {
	serverUrl.PROTOCOL = 'http'
}
export default {
	baseUrl: {
	},
	viewUrl: {
	}
}