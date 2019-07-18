<style lang="less">
	.form-item {
		height: 56px;
		&--required {
			color: #eb5e5e;
		}
		label {
			float: left;
			line-height: 32px;
			height: 32px;
		}
		&__content {
			float: left;
		}
		&__message {
			color: #eb5e5e;
			margin-top: 4px;
		}
	}
</style>
<template>
	<fieldset class="form-item">
		<label :style="labelStyle">
			<span>{{label}}</span>
			<slot name="required" v-if="required || isRequired">
				<span class="form-item--required">*</span>
			</slot>
		</label>
		<div class="form-item__content">
			<slot></slot>
			<transition>
				<div class="form-item__message" v-if="validateState == 'error' && showMessage && form.showMessage">{{validateMessage}}</div>
			</transition>
		</div>
	</fieldset>
</template>
<script>
	import EmitterMixin from '@/components/common/mixins/emitter'
	export default {
		mixins: [EmitterMixin],
		name: 'FormItem',
		props: {
			label: {
				type: String,
				default: ''
			},
			// 对应表单属性中的key名称
			prop: String,
			// 是否显示错误提示
			showMessage: {
				type: Boolean,
				default: true
			},
			labelWidth: [Number, String],
			rules: {
				type: Array,
				default: () => {
					return []
				}
			},
			// 外部校验结果显示优先
			error: String,
			required: Boolean
		},
		// 注入父级提供的属性
		inject: ['form'],
		data() {
			return {
				validateState: '',
				validateMessage: '',
				isRequired: false
			}
		},
		computed: {
			labelStyle() {
				let lwidth = this.labelWidth ? this.labelWidth : this.form.labelWidth
				let style = {}
				if (lwidth) {
					style.width = `${lwidth}px`
				}
				return style
			}
		},
		watch: {
			rules: function() {
				this.setRules()
			}
		},
		methods: {
			setRules() {
				let rules = this.getRules()
				if (rules && rules.length) {
					rules.every((rule) => {
						this.isRequired = rule.required
						return false
					})
				} else {
					this.isRequired = this.required
				}
				this.$off('FormBlur', this.onFieldBlur)
				this.$off('FormChange', this.onFieldChange)
				this.$on('FormBlur', this.onFieldBlur)
				this.$on('FormChange', this.onFieldChange)
			},
			onFieldBlur() {
				this.validate('blur')
			},
			onFieldChange() {
				this.validate('change')
			},
			getRules() {
				let formRules = this.form.rules
				formRules = formRules ? formRules[this.prop] : []
				return formRules.concat(this.rules)
			},
			getFilterRules(trigger) {
				let rules = this.getRules()
				return rules.filter((rule) => {
					return !rule.trigger || rule.trigger.indexOf(trigger) != -1
				})
			},
			validate(trigger, callback = function() {}) {
				let rules = this.getFilterRules(trigger)
				if (!rules || rules.length == 0) {
					if (!this.required) {
						callback()
						return false
					} else {
						rules = [{required: true}]
					}
				}
				this.validateState = 'validating'
				let valid = true
				for (let i = 0; i < rules.length; i++) {
					let rule = rules[i]
					valid = rule.validator && rule.validator()
					if (!valid) {
						this.validateState = 'error'
						this.validateMessage = rule.message
						callback(rule.message)
						return false
					}
					if ((i + 1) == rules.length) {
						this.validateState = !valid ? 'error' : 'success'
						this.validateMessage = !valid ? rule.message : ''
						callback(this.validateMessage)
					}
				}
			}
		},
		mounted() {
			if (this.prop) {
				this.dispatch('Form', 'FormItemAdd', this)
				this.setRules()
			}
		},
		beforeDestroy() {
			this.dispatch('Form', 'FormItemRemove', this)
		}
	}
</script>
