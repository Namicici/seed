import VisSenseFactory from 'vissense'
import Util from 'util'
import CollectApi from 'collectApi'

const VisSense = VisSenseFactory(window)

class EventHelper {
	constructor(el, data) {
		this.visMonitor = null
		this.el = el
		this.data = data
		this.hoverStartTime = 0
	}

	mouseoverHandler(event) {
		let relatedTarget = event.relatedTarget
		if (relatedTarget !== this.el && !Util.contains(this.el, relatedTarget)) {
			if (this.hoverStartTime === 0) {
				this.hoverStartTime = Date.now()
			}
		}
	}

	mouseoutHandler(event) {
		let relatedTarget = event.relatedTarget
		let data = this.data
		if (relatedTarget !== this.el && !Util.contains(this.el, relatedTarget)) {
			// 被点击后，不触发hover事件的上报
			if (this.hoverStartTime === 0) {
				this.hoverStartTime = 0
				return
			}
			let stayTime = Date.now() - this.hoverStartTime
			this.hoverStartTime = 0
			// hover时长小于1s不算有效hover
			if (stayTime < 1000) {
				return
			}
			CollectApi.handleSend({
				p7: data.el,
				p8: 'hover',
				p15: (stayTime / 1000).toFixed(2),
				...(data.reportData || {})
			})
			if (data.hoverHandler) {
				data.hoverHandler((stayTime / 1000).toFixed(2))
			}
		}
	}

	clickHandler() {
		let data = this.data
		CollectApi.handleSend({
			p7: data.el,
			p8: 'click',
			...(data.reportData || {})
		})
		if (data.clickHandler) {
			data.clickHandler()
		}
	}

	addShowListener() {
		let el = this.el
		let isReport = false
		this.visMonitor = VisSense(el).monitor({
			// fullyvisible: function(val) {
			// 	// console.log('report display', data, val)
			// },
			percentagechange: (VisMon) => {
				// 元素显示超过1半，则触发数据上报，每个元素只会被触发一次
				let data = this.data
				if (VisMon._state.percentage > 0.5 && !isReport && !data.noCollectDisplay) {
					isReport = true
					CollectApi.handleSend({
						p7: data.el,
						p8: 'display',
						...(data.reportData || {})
					})
					if (data.displayHandler) {
						data.displayHandler()
					}
				}
			}
		})
		this.visMonitor.start()
	}

	removeShowListener() {
		if (!this.visMonitor) {
			return
		}
		this.visMonitor.stop()
	}

	addMouseOverListener() {
		this.el.addEventListener('mouseover', this.mouseoverHandler.bind(this), false)
	}

	addMouseOutListener() {
		this.el.addEventListener('mouseout', this.mouseoutHandler.bind(this), false)
	}

	addClickListener() {
		this.el.addEventListener('click', this.clickHandler.bind(this), false)
	}

	removeMouseOverListener() {
		this.el.removeEventListener('mouseover', this.mouseoverHandler.bind(this))
	}

	removeMouseOutListener() {
		this.el.removeEventListener('mouseout', this.mouseoutHandler.bind(this))
	}

	removeClickListener() {
		this.el.removeEventListener('click', this.clickHandler.bind(this))
	}

	updateBinding(bindingData) {
		this.data = bindingData
	}
}

export default {
	install(Vue) {
		Vue.directive('docer-collect', {
			bind(el, binding) {
				el.eventHelperInstance = new EventHelper(el, binding.value)
				if (binding.modifiers.click) {
					el.eventHelperInstance.addClickListener()
				}

				if (binding.modifiers.hover) {
					el.eventHelperInstance.addMouseOverListener()
					el.eventHelperInstance.addMouseOutListener()
				}

				if (binding.modifiers.display) {
					el.eventHelperInstance.addShowListener()
				}
			},
			update: function(el, binding) {
				let eventHelperInstance = el.eventHelperInstance
				if (!eventHelperInstance) {
					return
				}
				let valueStr = ''
				let oldValueStr = ''
				try {
					valueStr = JSON.stringify(binding.value)
				} catch (e) {
				}
				try {
					oldValueStr = JSON.stringify(binding.oldValue)
				} catch (e) {
				}
				if (valueStr !== oldValueStr) {
					eventHelperInstance.updateBinding(binding.value)
				}
			},
			unbind(el, binding) {
				let eventHelperInstance = el.eventHelperInstance
				if (!eventHelperInstance) {
					return
				}
				if (binding.modifiers.click) {
					eventHelperInstance.removeClickListener()
				}

				if (binding.modifiers.display) {
					eventHelperInstance.removeShowListener()
				}
			}
		})
	}
}
