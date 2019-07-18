<style type="text/less" lang="less">
	@import (reference) "~@/assets/less/base/variables.less";
	.kso-tabs-nav {
		padding: 10px;
		box-sizing: border-box;
		display: inline-block;
		list-style: none;
		font-size: 16px;
		font-weight: 500;
		color: @text-color;
		position: relative;
		z-index: 9;
		cursor: pointer;
		transition: color 0.3s ease-in-out;
		&:hover {
			color: #333;
		}
		&.is-active {
			color: @color-primary;
		}
	}
</style>
<template>
	<div class="kso-tabs-nav"
		:class="[{'is-active': isActive}]"
		ref="tabs"
		@click="handleClick"
		v-text="label">
	</div>
</template>
<script>
export default {
	name: 'KsoTabNav',
	props: ['label', 'name'],
	computed: {
		isActive() {
			return this.$parent.value === this.name
		}
	},
	methods: {
		handleClick() {
			this.$parent.$emit('input', this.name)
			this.$parent.$emit('change', this.name)
		},
		handleUpdateNav() {
			this.$parent.handleUpdateNav()
		}
	},
	mounted() {
		this.handleUpdateNav()
	},
	destroyed() {
		this.handleUpdateNav()
	}
}
</script>
