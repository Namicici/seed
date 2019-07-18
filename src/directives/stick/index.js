import Util from 'util'
import KsoStick from './stick'

let timeHandler = 0

const scrollHandler = function(e) {
	let target = e.currentTarget || e
	if (!target) {
		return
	}
	let top = target.scrollTop
	// Observe.$emit(EventName.scrollPanel, top)
	window.clearTimeout(timeHandler)
	if (top > 50) {
		this.style.visibility = 'visible'
		this.style.opacity = 1
		return
	}
	// 避免临界值尴尬的闪烁
	if (top < 30) {
		this.style.opacity = 0
		timeHandler = window.setTimeout(() => {
			this.style.visibility = 'hidden'
		}, 400)
	}
}

const delegateMethods = {
	scrollToTop(el) {
		Util.scrollTo(el, 0)
	},
	feedback() {}
}

const delegate = e => {
	let target = e.target
	let delegateName = target.getAttribute('delegate')
	let method = delegateMethods[delegateName]
	if (typeof method === 'function') {
		method(e.currentTarget)
	}
}

export default {
	/**
	 * install function
	 * @param  {Vue} Vue
	 * @param  {object} options
	 */
	install(Vue) {
		Vue.directive('stick', {
			inserted: function(el, binding) {
				Vue.nextTick(() => {
					// feedbackCallback = binding.value.feedbackCallback
					let reportType = binding.value.reportType
					let newNode = new Vue({
						render: (h) => {
							return h(KsoStick, {props: {reportType}})
						}
					})
					let instance = newNode.$mount()
					let node = instance.$el
					el._scrollHandler = scrollHandler.bind(node.childNodes[0])
					el.appendChild(node)
					el.addEventListener('scroll', el._scrollHandler)
					el.addEventListener('click', delegate)
					el._scrollHandler(el)
				})
			},
			unbind: function(el) {
				el.removeEventListener('scroll', el._scrollHandler)
				el._scrollHandler = null
				el.removeEventListener('click', delegate)
			}
		})
	}
}
