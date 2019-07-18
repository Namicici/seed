<style lang="less">
	@import "~@/assets/less/base/variables.less";
	.menu {
		height: 48px;
		&__item {
			&--active {
				position: absolute;
				top: 14px;
				left: 0;
				height: 20px;
				line-height: 19px;
				padding: 0 10px;
				border-radius: 10px;
				background-color: @color-primary;
				transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
				color: #fff;
				z-index: 0;
			}
		}
	}
</style>
<template>
	<ul class="menu" v-docer-collect.display.hover="{el: 'fir_screen_condition_bar'}" ref="menu">
		<div v-for="(menu, index) in menus" :key="menu.cate_name + index" ref="menu-item">
			<MenuItem :menu="menu"
				:currentItem="currentItem"
				@click.native="onSelect(menu, index)"
				@selected="onSelect"></MenuItem>
			<div class="menu__item--active" :style="activeStyle" v-if="visible"></div>
		</div>
	</ul>
</template>
<script>
	import ServiceApi from 'serviceApi'
	import {CacheName} from 'config'
	import CollectApi from 'collectApi'
	import MenuItem from './menu-item'
	export default {
		name: 'Menu',
		components: {MenuItem},
		data() {
			return {
				menus: [],
				currentItem: null,
				menuItems: [],
				visible: false
			}
		},
		computed: {
			activeStyle() {
				let style = {}
				if (!this.menuItems || this.menuItems.length <= 0) { return }
				let offset = 0
				let itemSize = 0
				let $parentEl = this.$refs['menu']
				this.menuItems.every((item) => {
					let $el = item.$el
					if (!$el) { return false }
					if (!item.isActive) {
						offset = $el.clientWidth || 0
						return true
					} else {
						itemSize = $el.clientWidth
						let pos = $el.getBoundingClientRect()
						offset = pos.left
						let pPos = $parentEl.parentNode.getBoundingClientRect()
						offset -= pPos.left
						return false
					}
				})
				const transform = `translateX(${offset}px)`
				style.width = itemSize + 'px'
				style.transform = transform
				style.webkitTransform = transform
				return style
			}
		},
		watch: {
			menus: function() {
				this.currentItem = this.menus[0]
				setTimeout(() => {
					this.visible = true
				}, 500)
			}
		},
		methods: {
			onSelect(menu, index) {
				CollectApi.handleSend({p7: 'fir_screen_condition_bar', p8: 'click', p20: menu ? menu.cate_name : '全部'})
				this.currentItem = menu
				this.$emit('selected', this.currentItem, index)
			},
			getCategories(hasCacheData) {
				ServiceApi.get('font').getCategories().then((res) => {
					if (res && res.result == 'ok' && res.data) {
						let data = res.data
						if (data && data.length > 0) {
							data.unshift({cate_name: '全部'})
							this.setCache(CacheName.categoriesInfo, data, 2 * 60 * 60 * 1000)
						}
						if (!hasCacheData) {
							this.menus = data
						}
					}
				}).finally(() => {
					this.dealDefaultCate()
				})
			},
			dealDefaultCate() {
				if (!this.menus || this.menus.length <= 0) {
					let temp = []
					temp.unshift({cate_name: '全部'})
					this.menus = temp
				}
			},
			init() {
				this.getCache(CacheName.categoriesInfo).then((res) => {
					let {value, expire} = res
					if (value) {
						this.menus = value
					} 
					if (!value || expire) {
						this.getCategories(!!value)
					}
				})
			},
			updateMenuItem() {
				this.$nextTick(() => {
					this.menuItems = this.$children.filter(item => item.$options._componentTag == 'MenuItem')
				})
			}
		},
		mounted() {
			this.init()
		}
	}
</script>

