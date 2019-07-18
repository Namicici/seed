<style lang="less">
	.kso-progressbar-circle {
		position: relative;
		canvas {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			-webkit-transform: translate(-50%, -50%);
		}
	}
</style>
<template>
	<div class="kso-progressbar-circle">
		<i class="icon icon-down"></i>
		<canvas :ref="`circle-progress_${refId}`" :width="width" :height="height"></canvas>
	</div>
</template>
<script>
	export default {
		name: 'KsoProgressCircleBar',
		props: {
			width: {
				type: Number,
				default: 17
			},
			height: {
				type: Number,
				default: 17
			},
			percent: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				refId: Math.random()
			}
		},
		watch: {
			percent: function(val) {
				this.clearDraw()
				this.drawCircle(val)
			}
		},
		methods: {
			drawCircle(n) {
				let el = this.$refs[`circle-progress_${this.refId}`]
				if (!el) { return }
				let context = el.getContext('2d')
				let hElWidth = el.width / 2
				let hElHeight = el.height / 2
				let radius =  el.width / 2 - 1
				let outSideCircle = {
					style: '#4586d8',
					alpha: 1,
					lineWidth: 2
				}
				// let inSideCircle = {
				// 	style: '#4586d8',
				// 	alpha: 0.3,
				// 	lineWidth: 1
				// }
				//绘制透明度为0.5的园
				context.beginPath()
				context.globalAlpha = outSideCircle.alpha
				context.strokeStyle = outSideCircle.style
				context.lineWidth = outSideCircle.lineWidth
				//根据当前进度绘制圆
				context.arc(hElWidth, hElHeight, radius, -(Math.PI / 2), Math.PI * 2 / 100 * (n - 25), false)
				//画出圆形
				context.stroke()
			},
			clearDraw() {
				let el = this.$refs[`circle-progress_${this.refId}`]
				if (!el) { return }
				let context = el.getContext('2d')
				context.clearRect(0, 0, this.width, this.height)
			}
		},
		mounted() {
			this.drawCircle(this.percent)
		}
	}
</script>