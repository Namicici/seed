<style lang="less">
	@import "~@/assets/less/base/variables.less";
	.preview {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 100%;
		&__config {
			width: 76%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border: 1px solid #dedede;
			border-radius: 4px;
			height: 32px;
			input {
				border: none;
				outline: none;
				padding: 0 13px;
				width: 50%;
			}
		}
		&__font-size {
			width: 35%;
		}
		&__type {
			min-width: 34px;
			height: 32px;
			line-height: 32px;
			padding: 5px 0;
		}
		&__divider {
			width: 0;
			height: 16px;
			border-right: solid 1px #dedede;
		}
		&--diabled {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: @bg-color;
			opacity: 0.3;
			z-index: 100;
		}
		&__button {
			width: 72px;
		}
	}
</style>
<template>
	<div class="preview" v-docer-collect.display="{el: reportP7}">
		<div class="preview--diabled" v-show="disabled"></div>
		<div class="preview__config">
			<input v-model="previewValue" placeholder="请输入预览文本"/>
			<ksoFontSize class="preview__font-size" :size="currentSize" @sizeChange="onSelectSize" :disabled="disabled"></ksoFontSize>
			<div class="preview__divider"></div>
			<KsoDropdown class="preview__type" :list="types" @selected="onSelected" :position="'up'"></KsoDropdown>
		</div>
		<KsoButton @click.native="onPreview" :disabled="disabled" class="preview__button">预览</KsoButton>
		<KsoButton @click.native="onReset" :disabled="disabled" type="flat" class="preview__button">还原</KsoButton>
	</div>
</template>
<script>
	import KsoButton from '@/components/common/button/index'
	import ksoFontSize from './font-size'
	import KsoDropdown from '@/components/common/dropdown/index'
	export default {
		name: 'Preview',
		components: {KsoButton, ksoFontSize, KsoDropdown},
		props: {
			value: {
				type: String,
				default: ''
			},
			size: {
				type: Number,
				default: 14
			},
			type: {
				type: String,
				default: '0'
			},
			disabled: {
				type: Boolean,
				default: false
			},
			reportP7: String
		},
		data() {
			return {
				previewValue: this.value,
				types: [{label: '数字', name: '1', selected: false}, {label: '英文', name: '2', selected: false}, {label: '反色差', name: '3', selected: false}],
				currentType: this.type,
				currentSize: this.size,
				currentTypeItem: null
			}
		},
		watch: {
			size: function(val) {
				this.currentSize = val
			},
			type: function(val) {
				this.currentType = val
			},
			value: function(val) {
				console.log(`preview text ${val}`)
				this.previewValue = val
			}
		},
		methods: {
			onSelected(items) {
				this.currentType = items.length > 0 ? items[0].name : '0'
				this.currentTypeItem = items.length > 0 ? items[0] : null
			},
			onSelectSize(size) {
				this.currentSize = size
			},
			onPreview() {
				this.$emit('preview', {value: this.previewValue, type: this.currentType || '0', size: this.currentSize})
			},
			onReset() {
				this.currentSize = 14
				this.currentType = '0'
				if (this.currentTypeItem) {
					this.currentTypeItem.selected = false
				}
				this.previewValue = ''
				this.$emit('reset', {value: this.previewValue, type: this.currentType || '0', size: this.currentSize})
			}
		}
	}
</script>