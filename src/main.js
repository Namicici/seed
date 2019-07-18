import 'babel-polyfill'
import Vue from 'vue'
import ClientApi from 'clientApi'
import App from '@/app'
import Router from '@/router'
import Store from '@/store'
import {ClientInfo, MbApp} from 'config'
import OriginApi from 'originApi'
import Directives from '@/directives'
import KsoSvgIcon from '@/components/common/svg-icon/index'
import KsoToast from '@/components/common/toast/index'
import AuthInstro from '@/components/auth-instro/index'
import FontCard from '@/components/font-card/index'
import KsoInfiniteScroll from '@/components/common/infinite-scroll/index'
import KsoSearch from '@/components/common/search/index'
import Preview from '@/components/preview/index'
import KsoPageStatus from '@/components/common/page-status/index'
import KsoAuthModal from '@/components/auth-modal/index'
import KsoCommercialAuthModal from '@/components/commercial-auth-modal/index'
import KsoModal from '@/components/common/modal/index'
import {CommonMixin} from '@/mixins/index'
import '@/common/global-event/index'

Vue.mixin(CommonMixin)
Vue.use(Directives)
Vue.component(KsoToast)
Vue.component(KsoAuthModal)
Vue.component('KsoSvgIcon', KsoSvgIcon)
Vue.component('AuthInstro', AuthInstro)
Vue.component('KsoInfiniteScroll', KsoInfiniteScroll)
Vue.component('KsoSearch', KsoSearch)
Vue.component('Preview', Preview)
Vue.component('KsoPageStatus', KsoPageStatus)
Vue.component('FontCard', FontCard)
Vue.prototype.$toast = KsoToast
Vue.prototype.$authModal = KsoAuthModal
Vue.prototype.$commercialAuthModal = KsoCommercialAuthModal
Vue.prototype.$modal = KsoModal

const initPage = async() => {
	window.rootApp = new Vue({
		el: '#app',
		router: Router,
		store: Store,
		render: h => h(App)
	})
}

(async() => {
	initPage()
})()


