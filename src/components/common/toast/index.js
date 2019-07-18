import KsoToast from './toast'
import Vue from 'vue'

let toastInstance
KsoToast.newInstance = properties => {
	const _props = properties || {}
	const Instance = new Vue({
		data: _props,
		render: (h) => {
			return h(KsoToast, {props: _props})
		}
	})

	const component = Instance.$mount()
	document.body.appendChild(component.$el)

	const toast = Instance.$children[0]

	return {
		show(options) {
			toast.show(options)
		}
	}
}

export default {
	show(options) {
		toastInstance = toastInstance || KsoToast.newInstance({})
		toastInstance.show(options)
	}
}