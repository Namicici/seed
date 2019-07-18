<template>
	<div class="kso-tooltip" ref="tooltip" v-on:mouseover="onMouseover" v-on:mouseout="onMouseout">
		<slot></slot>
		<div class="kso-tooltip__content" v-show="visible">{{content}}</div>
	</div>
</template>
<style lang="less">
	.kso-tooltip {
		position: relative;
		&__content {
			height: 32px;
			line-height: 32px;
			padding: 0 12px;
			background: #fff;
			box-shadow: 0 -1px 9px 0 rgba(0, 0, 0, 0.2);
			border-radius: 4px;
			position: absolute;
			top: 48px;
			left: 136px;
			white-space: nowrap;
			z-index: 9;
			border: solid 1px #ccc;
		}
	}
</style>
<script>
	import Util from 'util'
	export default {
		name: 'KsoTooltip',
		props: {
			content: String
		},
		data() {
			return {
				visible: false,
				// x: 0,
				timer: null
			}
		},
		methods: {
			onMouseover(event) {
				let relatedTarget = event.relatedTarget
				if (relatedTarget !== this.$el && !Util.contains(this.$el, relatedTarget)) {
					if (!this.content) { return }
					this.timer = setTimeout(() => {
						if (!this.timer) { return }
						this.visible = true
						// this.x = event.offsetX > 138 ? 138 : event.offsetX < 168 ? 0 : event.offsetX
						console.log(`x: ${this.x}`, event)
					}, 1000)
				}
			},
			onMouseout(event) {
				let relatedTarget = event.relatedTarget
				if (relatedTarget !== this.$el && !Util.contains(this.$el, relatedTarget)) {
					this.timer = null
					this.visible = false
				}
			}
		}
	}
</script>