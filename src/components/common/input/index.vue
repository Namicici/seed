<style lang="less">
	.kso-input {
		height: 32px;
		line-height: 32px;
		input {
			border: 1px solid #dedede;
			border-radius: 4px;
			padding: 0 8px;
			background: #fff;
			width: 100%;
			height: 100%;
		}
		input:disabled {
			color: rgb(84, 84, 84);
			cursor: default;
			background-color: rgb(235, 235, 228);
		}
	}
</style>
<template>
	<div class="kso-input">
		<input :value="model" @change="onChange" @blur="onBlur" :placeholder="placeholder" :disabled="disabled" :readonly="readonly"/>
	</div>
</template>
<script>
	import EmitterMixin from '@/components/common/mixins/emitter'
	export default {
		name: 'Input',
		mixins: [EmitterMixin],
		props: {
			value: String,
			placeholder: String,
			disabled: Boolean,
			readonly: Boolean
		},
		data() {
			return {
				model: ''
			}
		},
		watch: {
			value: function(val) {
				this.model = val
			}
		},
		methods: {
			onChange() {
				this.$emit('input', this.model)
			},
			onBlur() {
				this.dispatch('FormItem', 'FormBlur', this.model)
			}
		}
	}
</script>
