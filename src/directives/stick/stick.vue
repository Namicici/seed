<style lang="less">
	.kso-stick {
		position: fixed;
		right: 20px;
		bottom: 48px;
		height: 50px;
		width: 23px;
		z-index: 900;
		&__btn {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 23px;
			height: 23px;
			background-color: #f6f6f6;
			border: 1px solid rgba(0, 0, 0, 0.2);
			border-radius: 3px;
			text-align: center;
			font-size: 15px;
			cursor: pointer;
			&:last-child {
				margin-top: 4px;
			}
			&:hover {
				background-color: #f1f8ff;
				border-color: #5087e5;
			}
			&:active {
				border-color: #3966bf;
				background-color: #e0f0ff;
			}
		}
		.svg-icon {
			height: 15px;
			width: 15px;
		}
	}
</style>
<template>
	<div class="kso-stick">
		<div class="kso-stick__btn kso-stick__top" delegate="scrollToTop" v-docer-collect.display.click="{el: reportType}">
			<svg aria-hidden="true" class="svg-icon" delegate="scrollToTop"><use xlink:href="#svg-stick"></use></svg>
		</div>
		<!-- <div class="kso-stick__btn kso-stick__feedback" delegate="feedback" v-report.display.hover.click="{type: reportType}">
			<svg aria-hidden="true" class="svg-icon" delegate="feedback"><use xlink:href="#svg-feedback"></use></svg>
		</div> -->
	</div>
</template>
<script>
	export default {
		name: 'KsoStick',
		props: {
			reportType: String
		}
	}
</script>