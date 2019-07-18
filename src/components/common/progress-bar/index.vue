<template>
	<div class="kso-progressbar">
		<div class="kso-progressbar__inner" :style="{'background-color': '#5087e5', width: percent + '%'}"></div>
	</div>
</template>
<style lang="less">
.kso-progressbar {
	width: 100%;
	height: 100%;
	background-color: #bbb;
	border-radius: 8px;
	&__inner {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		border-radius: 8px;
	}
}
</style>
<script>
	export default {
		name: 'KsoProgressBar',
		props: {
			percent: {
				type: Number,
				default: () => {
					return 0
				}
			}
		},
		data() {
			return {}
		}
	}
</script>