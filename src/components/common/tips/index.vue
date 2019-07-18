<style lang="less">
	@import "~@/assets/less/base/variables.less";
	@import "~@/assets/less/animation/index.less";
	.kso-tips {
		position: relative;
		width: 100%;
		height: 100%;
		background-color: #fff7cf;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 16px;
		.tips_warning {
			width: 16px!important;
			height: 16px!important;
		}
		&__content {
			display: flex;
			justify-content: space-around;
			align-items: center;
			a {
				margin-left: 24px;
				cursor: pointer;
			}
		}
		&__close {
			width: 16px;
			height: 16px;
			cursor: pointer;
		}
		.svg-close {
			width: 16px!important;
			height: 16px!important;
			padding: 4px;
			cursor: pointer;
			color: @text-color;
		}
	}
</style>
<template>
	<div class="kso-tips" v-if="visible" :class="{'fade-in-down': visible, 'fade-out-up': !visible}">
		<div class="kso-tips__content">
			<slot>
				<KsoSvgIcon svgName="tips_warning" className="tips_warning"></KsoSvgIcon>
				<slot name="text"></slot>
			</slot>
		</div>
		<div class="kso-tip__close" @click="onTipsClose">
			<KsoSvgIcon svgName="svg-close2" className="svg-close"></KsoSvgIcon>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'Tips',
		props: {
			value: Boolean,
		},
		data() {
			return {
				visible: false
			}
		},
		watch: {
			value: function(val) {
				this.visible = val
			}
		},
		methods: {
			onTipsClose() {
				this.visible = false
				this.$emit('input', this.visible)
			},
		},
		mounted() {
			this.visible = this.value
		}
	}
</script>
