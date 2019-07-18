import KsoModal from './modal.vue'
import Vue from 'vue'

KsoModal.newInstance = (properties) => {
	let _props = properties || {}
	const Instance = new Vue({
		data() {
			return Object.assign(_props, {
				visible: false,
				title: '',
				content: '',
				okText: undefined,
				cancelText: undefined,
				closable: true
			})
		},
		render(h) {
			return h(KsoModal, {
				props: _props,
				domProps: {
					value: this.visible
				},
				on: {
					'on-ok': this.ok,
					'on-cancel': this.cancel,
					'on-close': this.close
				}
			})
		},
		methods: {
			cancel() {
				this.$children[0].visible = false
				this.onCancel()
				this.remove()
			},
			ok() {
				this.$children[0].visible = false
				this.onOk()
				this.remove()
			},
			close() {
				this.$children[0].visible = false
				this.onClose()
				this.remove()
			},
			onOk() {
				console.log(`onOk`)
			},
			onCancel() {
				console.log(`onCancel`)
			},
			onClose() {
				console.log(`onClose`)
			},
			onRemove() {
				console.log(`onRemove`)
			},
			remove() {
				setTimeout(() => {
					this.destroy()
				}, 300)
			},
			destroy() {
				this.$destroy()
				document.body.removeChild(this.$el)
				this.onRemove()
			}
		}
	})

	let component = Instance.$mount()
	document.body.appendChild(component.$el)
	const modal = Instance.$children[0]

	return {
		show(options) {
			if ('title' in options) {
				modal.$parent.title = options.title
			}
			if ('content' in options) {
				modal.$parent.content = options.content
			}
			if ('closable' in options) {
				modal.$parent.closable = options.closable
			}
			if ('okText' in options) {
				modal.$parent.okText = options.okText
			}
			if ('cancelText' in options) {
				modal.$parent.cancelText = options.cancelText
			}
			if ('onOk' in options) {
				modal.$parent.onOk = options.onOk
			}
			if ('onCancel' in options) {
				modal.$parent.onCancel = options.onCancel
			}
			if ('onClose' in options) {
				modal.$parent.onClose = options.onClose
			}
			if ('onRemove' in options) {
				modal.$parent.onRemove = options.onRemove
			}
			modal.visible = true
		},
		remove() {
			modal.visible = false
			modal.$parent.remove()
		},
		component: modal
	}
}

export default KsoModal