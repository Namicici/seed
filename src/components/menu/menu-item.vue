<style lang="less">
	@import "~@/assets/less/base/variables.less";
	@import "~@/assets/less/animation/index";
	.menu__item {
		height: 48px;
		cursor: pointer;
		display: block;
		float: left;
		text-align: center;
		margin-right: 8px;
		z-index: 1;
		position: relative;
		&-title {
			height: 20px;
			line-height: 19px;
			padding: 0 10px;
			border-radius: 10px;
			margin: 14px 0;
			&:hover, &--hover {
				background-color: rgba(0, 0, 0, 0.06);
				color: inherit;
			}
			&--active {
				color: #fff;
				transition: color 0.5s;
				&:hover {
					color: #fff!important;
					transition: color 0.5s;
				}
			}
		}
	}
</style>
<template>
	<li class="menu__item"
		@mouseenter="handleMouseenter" @mouseout="handleMouseout" 
		:ref="`menuItem__${menu.cate_name}`">
		<div class="menu__item-title"
			:class="{'menu__item-title--active': isActive,
				'menu__item-title--hover': opend}">{{menu.cate_name}}</div>
		<Submenu v-show="opend" :submenu="menu"
			@select="onSelect"
			:class="{'fade-in': opend, 'fade-out': !opend}"></Submenu>
	</li>
</template>
<script>
	import Submenu from './submenu'
	import Util from 'util'
	export default {
		name: 'MenuItem',
		components: {Submenu},
		props: {
			menu: Object,
			index: Number,
			currentItem: Object
		},
		data() {
			return {
				opend: false
			}
		},
		computed: {
			isActive() {
				return this.currentItem.cate_name == this.menu.cate_name
			}
		},
		methods: {
			handleMouseenter(e) {
				let el = this.$refs[`menuItem__${this.menu.cate_name}`]
				if (!el) { return }
				let relatedTarget = e.relatedTarget
				if (relatedTarget !== el && !Util.contains(el, relatedTarget)) {
					this.opend = true
				}
			},
			handleMouseout(e) {
				let el = this.$refs[`menuItem__${this.menu.cate_name}`]
				if (!el) { return }
				let relatedTarget = e.relatedTarget
				if (relatedTarget !== el && !Util.contains(el, relatedTarget)) {
					this.opend = false
				}
			},
			onSelect() {
				this.$emit('selected', this.menu, this.index)
			}
		},
		mounted() {
			this.$parent.updateMenuItem()
		}
	}
</script>
