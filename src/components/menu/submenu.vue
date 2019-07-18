<style lang="less">
	@import "~@/assets/less/animation/index";
	.submenu {
		background-color: #fff;
		position: fixed;
		z-index: 9;
		box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.3);
		left: 20px;
		right: 20px;
		border-radius: 4px;
		&__row {
			padding: 16px 24px;
			border-bottom: solid 1px #f4f4f4;
			display: flex;
			align-items: center;
			&:last-child {
				border-bottom: none;
			}
		}
		&__kind {
			width: 80px;
		}
		&__kind-item {
			padding: 6px 10px;
			border-radius: 12px;
			background-color: transparent;
			display: block;
			margin: 4px;
			float: left;
			cursor: pointer;
			&:hover {
				background-color: rgba(0, 0, 0, 0.06);
			}
			&--active {
				background-color: rgba(0, 0, 0, 0.1);
			}
		}
	}
</style>
<template>
	<ul class="submenu" v-docer-collect.display="{el: 'sec_screen_condition_list'}">
		<li class="submenu__row" v-for="(k, kIndex) in submenu.sub_cates" :key="k.cate_name + kIndex">
			<div class="submenu__kind">{{k.cate_name}}</div>
			<div>
				<p v-for="(s, sIndex) in k.sub_cates" :key="k.cate_name + kIndex + s.cate_name + sIndex" 
					@click="onSelect(k, kIndex, s)"
					v-docer-collect.hover.click="{el: 'sec_screen_condition_list', reportData: {p20: s.cate_name}}"
					class="submenu__kind-item"
					:class="{'submenu__kind-item--active': k.activeItem && k.activeItem.cate_name == s.cate_name}">{{s.cate_name}}</p>
			</div>
		</li>
	</ul>
</template>
<script>
	export default {
		name: 'Submenu',
		props: {
			submenu: Object
		},
		methods: {
			onSelect(k, kIndex, s) {
				if (k.activeItem && k.activeItem.cate_name == s.cate_name) {
					this.$set(k, 'activeItem', null)
				} else {
					this.$set(k, 'activeItem', s)
				}
				this.$set(this.submenu.sub_cates, kIndex, k)
				this.$emit('selected')
			}
		}
	}
</script>
