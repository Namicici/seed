<style lang="less">
	.kso-checkbox {
		cursor: pointer;
		input {
			width: 16px;
			height: 16px;
			appearance: none;
			border: 1px solid #ccc;
			border-radius: 2px;
			position: relative;
			vertical-align: middle;
			text-align: center;
			&:checked {
				&:after {
					content: "";
					background: url("../../../assets/images/svg-check.svg") no-repeat;
					width: 14px;
					height: 14px;
					display: inline-block;
					color: rgba(0, 0, 0, 0.6);
				}
			}
		}
	}
</style>
<template>
	<label class="kso-checkbox">
		<span class="kso-checkbox"></span>
		<input 	type="checkbox"
				:disabled="disabled"
				:name="name"
				:checked="currentValue"
				@change="change"/>
		<slot><span>{{label}}</span></slot>
	</label>
</template>
<script>
	export default {
		name: 'KsoCheckbox',
		props: {
			disabled: {
				type: Boolean,
				default: false
			},
			name: String,
			value: {
				type: [String, Number, Boolean],
				default: false
			},
			label: String,
			trueValue: {
				type: [String, Number, Boolean],
				default: true
			},
			falseValue: {
				type: [String, Number, Boolean],
				default: false
			}
		},
		data() {
			return {
				currentValue: this.value
			}
		},
		watch: {
			value: function(val) {
				this.currentValue = val
			}
		},
		methods: {
			change(e) {
				if (this.disabled) {
					return false
				}
				const checked = e.target.checked
				this.currentValue = checked
				const value = checked ? this.trueValue : this.falseValue
				console.log(`checkbox value ${value}`)
				this.$emit('input', value)
			}
		}
	}
</script>
