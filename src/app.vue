<template>
	<div id="App">
		<transition name="fade-in">
			<router-view></router-view>
		</transition>
	</div>
</template>
<style lang="less">
@import "~@/assets/less/index.less";
#App {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	color: @text-color;
	overflow: hidden;
}
</style>
<script>
export default {
	name: 'App',
	data() {
		return {}
	}
}
</script>