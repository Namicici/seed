<template>
	<form>
		<slot></slot>
	</form>
</template>
<script>
	export default {
		name: 'Form',
		props: {
			// 校验规则
			rules: {
				type: Object,
				default: () => {
					return {}
				}
			},
			// 表单默认值
			value: {
				type: Object,
				default: () => {
					return {}
				}
			},
			labelWidth: {
				type: [Number, String],
				default: 80
			},
			showMessage: {
				type: Boolean,
				default: true
			}
		},
		provide() {
			// 提供注入子孙的属性
			return {form: this}
		},
		data() {
			return {
				fields: []
			}
		},
		methods: {
			onFormItemAdd(item) {
				if (item) {
					this.fields.push(item)
				}
			},
			onFormItemRemove(item) {
				if (item.prop) {
					let index = this.fields.indexOf(item)
					if (index >= 0) {
						this.fields.splice(index, 1)
					}
				}
			},
			validate(callback) {
				return new Promise((resolve) => {
					let valid = true
					let count = 0
					this.fields.forEach((field) => {
						field.validate('', (error) => {
							if (error) {
								valid = false
							}
							if (++count == this.fields.length) {
								resolve(valid)
								callback(valid)
							}
						})
					})
				})
			}
		},
		created() {
			this.$on('FormItemAdd', this.onFormItemAdd)
			this.$on('FormItemRemove', this.onFormItemRemove)
		}
	}
</script>

