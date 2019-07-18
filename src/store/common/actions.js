import * as types from './mutation-types.js'

export default {
	setAppName({commit}, name) {
		commit(types.APP_NAME, name)
	},
	setPannelEnable({commit}, data) {
		commit(types.PANNEL_ENABLE, data)
	},
	setCommercialAuth({commit}, agree) {
		commit(types.COMMERCIAL_AUTH, agree)
	}
}