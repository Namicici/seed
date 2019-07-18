/**
 * lazyload
 */
// import VueLazyLoad from 'vue-lazyload'
import Stick from './stick/index'
import ClickOutside from './click-outside/index'
import Collect from './collect'

const install = function(Vue) {
	if (install.installed) { return }

	// Vue.use(VueLazyLoad, {
	// 	preLoad: 1.3,
	// 	error: './images/loading-error.png',
	// 	loading: './images/loading-lazy.gif',
	// 	attempt: 1, // default 1
	// 	listenEvents: ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend', 'mouseover'],
	// 	throttleWait: 50
	// })

	Vue.use(Stick)
	Vue.use(ClickOutside)
	Vue.use(Collect)
}

export default {
	install
}
