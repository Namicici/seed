
export default {
	install(Vue) {
		Vue.directive('outside', {
			bind(el, binding) {
				function documentHandler(e) {
					if (el.contains(e.target)) {
						return false
					}
					if (binding.expression) {
						binding.value(e)
					}
				}
				el.__vueClickOutside__ = documentHandler
				if (binding.modifiers.click) {
					document.addEventListener('click', documentHandler)
				}
				if (binding.modifiers.mousedown) {
					document.addEventListener('mousedown', documentHandler)
				}
			},
			unbind(el) {
				document.removeEventListener('click', el.__vueClickOutside__)
				document.removeEventListener('mousedown', el.__vueClickOutside__)
				delete el.__vueClickOutside__
			}
		})
	}
}
