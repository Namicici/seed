<template>
	<div class="kso-toast" :class="{'kso-toast--show fade-in-down': visible, 'kso-toast--hidden fade-out-up':!visible}">{{options.content}}</div>
</template>
<style lang="less">
	@import "~@/assets/less/animation/index.less";
	.kso-toast {
		position: fixed;
		top: 0;
		left: 12px;
		right: 12px;
		height: 32px;
		color: #fff;
		border-radius: 5px;
		text-align: center;
		margin-top: 12px;
		line-height: 32px;
		background-color: rgba(0, 0, 0, 0.7);
		z-index: 10;
		&--show {
			opacity: 1;
		}
		&--hidden {
			opacity: 0;
		}
	}
</style>
<script>
	export default {
		name: 'KsoToast',
		data() {
			return {
				options: {},
				visible: false
			}
		},
		methods: {
			show(options) {
				this.options = options
				this.visible = true
				setTimeout(() => {
					this.visible = false
				}, options.duration || 3000)
			}
		}
	}
</script>