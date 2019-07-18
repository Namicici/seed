<!-- svg-sprite组件 -->
<template>
	<svg :class="svgClass" aria-hidden="true" :width="width" :height="height">
		<use :xlink:href="iconName"></use>
	</svg>
</template>
<script>
	// 引入所有的svg的文件
	const requireAll = requireContext => {
		return requireContext.keys().map(requireContext)
	}
	const req = require.context('../../../assets/svg', true, /\.svg$/)
	requireAll(req)
	export default {
		name: 'KsoSvgIcon',
		props: {
			svgName: {
				type: String,
				required: true
			},
			className: {
				type: String
			},
			width: {
				type: String,
				default: '14px'
			},
			height: {
				type: String,
				default: '14px'
			}
		},
		computed: {
			iconName() {
				return `#svg-${this.svgName}`
			},
			svgClass() {
				if (this.className) {
					return `svg-icon ${this.className}`
				}
				return `svg-icon svg-${this.svgName}`
			}
		}
	}
</script>
<style lang="less">
	.svg-icon {
		fill: currentColor;
		overflow: hidden;
		&:hover {
			color: #ccc;
		}
		&:active {
			color: #666;
		}
	}
</style>
