<style lang="less">
	@import "~@/assets/less/animation/index";
	.kso-search {
		z-index: 9;
		input {
			height: 100%;
			border: none;
			outline: none;
			border-radius: 6px;
			padding-left: 33px;
		}
		&__input-area {
			height: 100%;
		}
		&__pannel {
			margin-top: 4px;
			background: #fff;
			box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.28);
			border-radius: 2px;
			max-height: 177px;
			overflow: auto;
			li {
				height: 28px;
				padding-left: 10px;
				line-height: 28px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				&:hover {
					background: rgba(0, 0, 0, 0.06);
					border-radius: 2px;
				}
				p {
					cursor: pointer;
				}
			}
		}
		&__pannel-bar {
			height: 30px;
			padding-left: 10px;
			line-height: 30px;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		.svg-close2 {
			margin-right: 11px;
			width: 10px;
			height: 10px;
			cursor: pointer;
		}
		.svg-search {
			margin-left: 13px;
			margin-top: 7px;
			position: absolute;
		}
		.svg-delete {
			margin-right: 11px;
			width: 14px;
			height: 14px;
			cursor: pointer;
		}
	}
</style>
<template>
	<div class="kso-search" v-outside.click="onClickOutside">
		<div class="kso-search__input-area">
			<KsoSvgIcon :svgName="'svg-search'" :className="'svg-search'"></KsoSvgIcon>
			<input v-model="keyword" @keyup.enter="onEnter" @focus="onFocus" @click="onFocus" placeholder="搜索字体名称"/>
		</div>
		<div 	class="kso-search__pannel"
				:class="{'fade-in': showPannel, 'fade-out': !showPannel}"
				v-show="showPannel"
				v-docer-collect.display="{el: 'near_search_list'}">
			<div class="kso-search__pannel-bar">
				<span>最近搜索</span>
				<p @click="onDeleteAll" v-docer-collect.click="{el: 'near_search_list', reportData: {p8: 'clean'}}">
					<KsoSvgIcon :svgName="'svg-delete'" :className="'svg-delete'" :width="'14px'" :height="'14px'"></KsoSvgIcon>
				</p>
			</div>
			<ul>
				<li v-for="(k, index) in recents" :key="k + index"
					@mouseover="onMouseover($event, index)"
					@mouseout="onMouseout($event, index)"
					:ref="`recentKeyword_${index}`">
					<p @click="onSelect(k, true)" v-docer-collect.click="{el: 'near_search_list'}">{{k}}</p>
					<p 	v-show="hoverIndex === index"
						@click="onDelete(index, true)"
						v-docer-collect.click="{el: 'near_search_list', reportData: {p8: 'delete'}}">
						<KsoSvgIcon :svgName="'svg-close2'"
									:className="'svg-close2'"
									:width="'10px'"
									:height="'10px'">
						</KsoSvgIcon>
					</p>
				</li>
				<li v-for="(k, index) in keywords" :key="k + index + recents.length"
					@mouseover="onMouseover($event, index + recents.length)"
					@mouseout="onMouseout($event, index + recents.length)"
					:ref="`recentKeyword_${index + recents.length}`">
					<p @click="onSelect(k)" v-docer-collect.click="{el: 'near_search_list'}">{{k}}</p>
					<p 	v-show="hoverIndex === (index + recents.length)"
						@click="onDelete(index)"
						v-docer-collect.click="{el: 'near_search_list', reportData: {p8: 'delete'}}">
						<KsoSvgIcon :svgName="'svg-close2'"
									:className="'svg-close2'"
									:width="'10px'"
									:height="'10px'">
						</KsoSvgIcon>
					</p>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import ServiceApi from 'serviceApi'
	import Util from 'util'
	import Cache from '@/common/utils/cache'
	import {EventName} from 'config'
	export default {
		name: 'KsoSearch',
		props: {
			value: String,
			showRecent: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				keyword: this.value,
				keywords: [],
				focus: false,
				hoverIndex: '',
				recents: []
			}
		},
		watch: {
			value: function(val) {
				this.keyword = val
			}
		},
		computed: {
			showPannel() {
				return this.focus && (this.keywords.length > 0 || this.recents.length > 0)
			}
		},
		methods: {
			onClickOutside() {
				this.focus = false
				if (this.keyword && this.recents.indexOf(this.keyword) < 0 && this.keywords.indexOf(this.keyword) < 0) {
					this.recents.push(this.keyword)
				}
				if (this.recents.length > 3) {
					this.recents.shift()
				}
				console.log('click outside', this.recents)
				this.setRecentKeywords(this.recents)
				this.$emit('input', this.keyword)
				this.$emit('tag', false)
			},
			onMouseover(e, index) {
				let el = this.$refs[`recentKeyword_${index}`][0]
				if (!el) { return }
				let relatedTarget = e.relatedTarget
				if (relatedTarget !== el && !Util.contains(el, relatedTarget)) {
					this.hoverIndex = index
				}
			},
			onMouseout(e, index) {
				let el = this.$refs[`recentKeyword_${index}`][0]
				if (!el) { return }
				let relatedTarget = e.relatedTarget
				if (relatedTarget !== el && !Util.contains(el, relatedTarget)) {
					this.hoverIndex = ''
				}
			},
			onFocus() {
				this.focus = true  
			},
			onEnter() {
				this.onClickOutside()
			},
			onSelect(k, isRecent) {
				this.keyword = k
				this.$emit('input', this.keyword)
				// 用tag标识是推荐字库标签
				this.$emit('tag', isRecent ? false : true)
				this.focus = false
			},
			onDelete(index, isRecent) {
				console.log(`recent search delete index ${index}`)
				if (isRecent) {
					this.recents.splice(index, 1)
				} else {
					this.keywords.splice(index, 1)
				}
			},
			onDeleteAll() {
				this.keywords = []
				this.recents = []
			},
			getRecentSearchAddition() {
				ServiceApi.get('font').getRecommandKeywords().then((res) => {
					console.log(`recent search words `, this.keywords)
					if (res && res.result == 'ok' && res.data) {
						this.keywords = res.data || []
						console.log(`recent search words `, this.keywords)
					}
				})
			},
			getRecentKeywords() {
				Cache.get(EventName.recentSearchKeywords).then((res) => {
					if (res) {
						let {value} = res
						this.recents = value || []
					}
				})
			},
			setRecentKeywords(value) {
				console.log(`set recent keywords`, value)
				Cache.set(EventName.recentSearchKeywords, value)
			},
			init() {
				if (this.showRecent) {
					this.getRecentKeywords()
					this.getRecentSearchAddition()
				}
			}
		},
		mounted() {
			this.init()
		}
	}
</script>
