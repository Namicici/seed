
import KsoModal from './modal.js'

let instance

export default {
	show(options) {
		let ins = instance || KsoModal.newInstance()
		ins.show(options)
	}
}