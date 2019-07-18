<style lang="less">
	@import "~@/assets/less/base/variables.less";
	.kso-font-size {
		position: relative;
		p {
			display: inline-block;
			margin-right: 10px;
			font-size: 14px;
			vertical-align: middle;
			width: 21px;
			height: 21px;
		}
		&__item {
			width: 46px;
			padding: 6px 0;
			display: inline-block;
			transform: translate(0%, -47%);
			cursor: pointer;
			border-bottom: solid 1px rgba(0, 0, 0, 0.15);
			vertical-align: middle;
			&-circle {
				position: absolute;
				right: 0;
				width: 12px;
				height: 12px;
				border-radius: 12px;
				border: solid 1px;
				border-color: @color-primary;
				background-color: #fff;
				cursor: pointer;
				&--disabled {
					border-color: rgba(0, 0, 0, 0.15);
				}
			}
			&-mark {
				position: absolute;
				width: 0;
				height: 5px;
				right: 6px;
				top: 10px;
				border-right: solid 1px rgba(0, 0, 0, 0.15);
				text-align: center;
				&--active {
					border-color: @color-primary;
				}
			}
			&--active {
				border-bottom: solid 1px;
				border-color: @color-primary;
			}
			&:nth-child(2) {
				width: 6px;
			}
			&:nth-child(5) {
				width: 40px;
				.kso-font-size__item-mark {
					right: 0;
				}
				.kso-font-size__item-circle {
					transform: translate(50%, -0%);
				}
			}
		}
		&__mask {
			right: 0;
			position: absolute;
			top: 0;
			left: 30px;
			height: 100%;
			background: #fff;
			opacity: 0;
		}
		&__clickarea {
			width: 46px;
			position: relative;
			padding: 6px 0;
			display: inline-block;
			cursor: pointer;
			vertical-align: middle;
			&:first-child {
				width: 16.5%;
			}
			&:last-child {
				width: 16.5%;
			}
		}
		.svg-font {
			width: 21px;
			height: 21px;
		}
	}
</style>
<template>
	<div class="kso-font-size">
		<p>
			<KsoSvgIcon :svgName="'svg-font'" :className="'svg-font'"></KsoSvgIcon>
		</p>
		<div class="kso-font-size__item"
			 :class="{'kso-font-size__item--active': index <= fontSizes.indexOf(currentSize)}"
			 v-for="(size, index) in fontSizes" :key="size">
			<div class="kso-font-size__item-mark" :class="{'kso-font-size__item-mark--active': index <= fontSizes.indexOf(currentSize)}"></div>
			<div v-show="currentSize == size" class="kso-font-size__item-circle" :class="{'kso-font-size__item-circle--disabled': disabled}"></div>
		</div>
		<div class="kso-font-size__mask">
			<div v-for="(size) in fontSizes" :key="size" class="kso-font-size__clickarea" @click="onSelect(size)"></div>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'KsoFontSize',
		props: {
			fontSizes: {
				type: Array,
				default: () => {
					return [14, 16, 18, 20]
				}
			},
			size: {
				type: Number,
				default: 16
			},
			disabled: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				currentSize: this.size
			}
		},
		watch: {
			size: function(val) {
				this.currentSize = val
			}
		},
		methods: {
			onSelect(size) {
				this.currentSize = size
				this.$emit('sizeChange', size)
			}
		}
	}
</script>
