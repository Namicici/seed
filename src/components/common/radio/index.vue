<style lang="less">
	.kso-radio {
		margin: 0 8px;
		input {
			-webkit-appearance: none;
			width: 13px;
			height: 13px;
			vertical-align: middle;
			cursor: pointer;
			border: solid 1px #ccc;
			border-radius: 100%;
			box-sizing: content-box;
			background-clip: content-box;
		}
		input:checked {
			background-color: #666;
			width: 7px;
			height: 7px;
			padding: 3px;
			box-sizing: content-box;
			background-clip: content-box;
			border-radius: 50%;
		}
		span {
			margin-left: 4px;
			vertical-align: middle;
		}
	}
</style>
<template>
	<label class="kso-radio">
		<input type="radio" v-model="model" :value="selectedValue" @click="onSelected()"/><span>{{label}}</span>
	</label>
</template>
<script>
	export default {
		name: 'Radio',
		props: {
			label: String,
			value: [String, Boolean, Number],
			selectedValue: [String, Boolean, Number]
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
			onSelected() {
				this.model = this.selectedValue
				this.$emit('input', this.model)
			}
		},
		mounted() {
			this.model = this.value
		}
	}
</script>
