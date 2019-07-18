<style type="text/less" lang="less">
	@import (reference) "~@/assets/less/base/variables.less";
	.kso-tabs {
		white-space: nowrap;
		position: relative;
		transition: transform 0.3s;
		&__active-bar {
			position: absolute;
			bottom: -1px;
			left: 0;
			height: 2px;
			background-color: @color-primary;
			z-index: 1;
			transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
			list-style: none;
		}
	}
</style>
<template>
	<div class="kso-tabs" ref="kso-tabs">
		<slot></slot>
		<div :class="['kso-tabs__active-bar']" :style="barStyle"></div>
	</div>
</template>
<script>
export default {
	name: 'KsoTabs',
	props: {
		value: {}
	},
	data() {
		return {
			tabs: []
		}
	},
	computed: {
		barStyle() {
			let style = {}
			let offset = 0
			let tabSize = 0
			let $parentEl = this.$refs['kso-tabs']
			this.tabs.every((tab) => {
				let $el = tab.$el
				if (!$el) { return false }

				if (!tab.isActive) {
					offset = $el.clientWidth || 0
					return true
				} else {
					tabSize = $el.clientWidth
					let pos = $el.getBoundingClientRect()
					offset = pos.left
					let pPos = $parentEl.parentNode.getBoundingClientRect()
					offset -= pPos.left
					return false
				}
			})
			const transform = `translateX(${offset}px)`
			style.width = tabSize + 'px'
			style.transform = transform
			style.webkitTransform = transform
			return style
		}
	},
	methods: {
		handleUpdateNav() {
			this.tabs = this.$children.filter(item => item.$options._componentTag == 'KsoTabNav')
		}
	}
}
</script>
