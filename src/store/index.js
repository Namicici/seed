import Vue from 'vue'
import Vuex from 'vuex'
import Common from './common/index'

Vue.use(Vuex)

const Store = new Vuex.Store({
	modules: {
		common: Common
	},
	strict: false
})

export default Store