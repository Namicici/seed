<style lang="less">
	@import "~@/assets/less/animation/index";
	.kso-dropdown {
		position: relative;
		&__button {
			cursor: pointer;
			text-align: center;
			height: 21px;
			line-height: 19px;
			span {
				vertical-align: middle;
			}
		}
		&__pannel {
			position: absolute;
			bottom: 28px;
			right: 0;
			min-width: 100px;
			background: #fff;
			box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.3);
			border-radius: 4px;
			&--down {
				top: 30px;
				bottom: inherit;
			}
			&--up {
				bottom: 28px;
				top: inherit;
			}
			li {
				height: 28px;
				line-height: 28px;
				padding: 0 12px 0 28px;
				cursor: pointer;
				position: relative;
				&:hover {
					background-color: rgba(0, 0, 0, 0.06);
				}
			}
			&--noicon {
				padding-left: 12px!important;
			}
			&--selected {
				background-color: rgba(0, 0, 0, 0.1)!important;
			}
			&--disabled {
				color: rgba(102, 102, 102, 0.8)!important;
			}
		}
		.svg-arrow-up {
			transform: rotate(180deg);
			vertical-align: middle;
		}
		.svg-arrow-down {
			vertical-align: middle;
		}
		.svg-check {
			position: absolute;
			left: 8px;
			vertical-align: middle;
			top: 8px;
		}
	}
</style>
<template>
	<div class="kso-dropdown" v-outside.mousedown="onOutsideClick">
		<div class="kso-dropdown__button" @click="expendChange">
			<slot name="text">
				<span>{{currentItem && currentItem.selected ? currentItem.label : ''}}</span>
			</slot>
			<slot name="icon">
				<KsoSvgIcon :svgName="'svg-arrow-down'" :className="svgClass"></KsoSvgIcon>
			</slot>
		</div>
		<ul class="kso-dropdown__pannel"
			:class="{'kso-dropdown__pannel--down': position == 'down', 'kso-dropdown__pannel--up': position == 'up', 'fade-in': expend, 'fade-out': !expend}"
			:style="{'min-width': width + 'px'}"
			v-show="expend">
			<li v-for="item in list" :key="item.name" 
				:class="{'kso-dropdown__pannel--selected': item.selected && !clapAuto, 'kso-dropdown__pannel--noicon': !isShowIcon, 'kso-dropdown__pannel--disabled': item.disabled}"
				@click="onSelect(item)">
				<KsoSvgIcon :svgName="'svg-check'" :className="'svg-check'" v-show="item.selected && isShowIcon"></KsoSvgIcon>
				<span>{{item.label}}</span>
			</li>
		</ul>
	</div>
</template>
<script>
	export default {
		name: 'KsoDropdown',
		props: {
			type: {
				type: String,
				// radio checkbox
				default: 'radio'
			},
			list: Array,
			isShowIcon: {
				type: Boolean,
				default: true
			},
			position: {
				type: String,
				// pannel 向上，和向下
				default: 'down'
			},
			// 选中后自动收起
			clapAuto: {
				type: Boolean,
				default: false
			},
			selectAuto: {
				type: Boolean,
				default: false
			},
			selectedIndex: {
				type: Number,
				default: 0
			},
			width: {
				type: Number,
				default: 100
			},
			disabled: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			svgClass() {
				return this.expend ? 'svg-arrow-up' : 'svg-arrow-down'
			}
		},
		data() {
			return {
				currentItem: null,
				expend: false
			}
		},
		watch: {
			expend: function(val) {
				if (!val) {
					this.$emit('selected', this.getSelectedItems())
				}
				this.$emit('expend', val)
			},
			selectedIndex: function(val) {
				if (val <= 0) { return }
				this.onSelect(this.list[val - 1])
			}
		},
		methods: {
			onOutsideClick() {
				this.expend = false
			},
			expendChange() {
				this.expend = !this.expend
			},
			getSelectedItems() {
				let temp = []
				for (let i = 0; i < this.list.length; i++) {
					if (this.list[i].selected) {
						temp.push(this.list[i])
					}
				}
				return temp
			},
			onSelect(item) {
				if (item && item.disabled) { return }
				if (this.type == 'radio') {
					if (this.currentItem && this.currentItem.name != item.name) {
						this.$set(this.currentItem, 'selected', false)
					}
					if (!this.selectAuto || !item.selected) {
						this.$set(item, 'selected', !item.selected)
					}
					this.currentItem = item
					this.$emit('change', this.currentItem)
				} else {
					this.$set(item, 'selected', !item.selected)
					this.$emit('change', item)
				}
				if (this.clapAuto) {
					this.expend = false
				}
			}
		},
		mounted() {
			if (this.selectAuto) {
				this.onSelect(this.list[0])
			}
		}
	}
</script>
