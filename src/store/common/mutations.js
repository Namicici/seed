import * as types from './mutation-types.js'

export default {
	[types.APP_NAME](state, name) {
		state.appName = name || 'wps'
	},
	[types.PANNEL_ENABLE](state, enable) {
		state.pannelEnable = enable
	},
	[types.COMMERCIAL_AUTH](state, agree) {
		state.commercialAuth = agree
	}
}