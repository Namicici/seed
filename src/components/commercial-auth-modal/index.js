import KsoCommercialAuthModal from './commercial-auth-modal.vue'
import Vue from 'vue'

KsoCommercialAuthModal.newInstance = (properties) => {
	let _props = properties || {}
	const Instance = new Vue({
		data: _props,
		render: (h) => {
			return h(KsoCommercialAuthModal, {props: _props})
		}
	})

	let component = Instance.$mount()
	document.body.appendChild(component.$el)
	const modal = Instance.$children[0]

	return {
		show(options) {
			modal.show(options)
		}
	}
}

let instance

export default {
	show(options) {
		instance = instance || KsoCommercialAuthModal.newInstance()
		instance.show(options)
	}
}