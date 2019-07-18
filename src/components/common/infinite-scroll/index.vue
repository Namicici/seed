<template>
	<div ref="infinite-scroll"
		class="kso-scrollbar"
		:class="{'scrollbar--hidden': isScrollStop, 'scrollbar--show': !isScrollStop}"
		v-on:wheel="onWheel"
		v-on:mouseover="onMousein"
		v-on:mouseout="onMouseout">
		<slot></slot>
		<div class="kso-scrollbar__bottom">
			<slot name="finished"></slot>
		</div>
		<div class="kso-loading" v-show="!finished && enableBottomLoading">
			<img src="../../../assets/images/loading16.gif"/>
			<span>正在努力加载中...</span>
		</div>
		<slot name="bottom"></slot>
	</div>
</template>
<style lang="less">
@import "~@/assets/less/animation/index.less";
.kso-scrollbar {
	overflow: scroll;
	.kso-loading {
		text-align: center;
		margin: 24px 16px;
		clear: both;
		img {
			vertical-align: middle;
		}
		span {
			vertical-align: middle;
		}
	}
	&__bottom {
		height: 32px;
		line-height: 32px;
		text-align: center;
		clear: both;
	}
}
</style>
<script>
import Util from 'util'
import CollectApi from 'collectApi'
export default {
	name: 'KsoInfiniteScroll',
	props: {
		distance: {
			type: Number,
			default: 50
		},
		finished: Boolean,
		enableBottomLoading: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			scrolling: false,
			scrollTimes: 0,
			scrollTop: 0,
			isScrollStop: true
		}
	},
	methods: {
		onMousein() {
			let el = this.$refs['infinite-scroll']
			if (!el) { return }
			let relatedTarget = event.relatedTarget
			if (relatedTarget !== el && !Util.contains(el, relatedTarget)) {
				this.isScrollStop = false
			}
		},
		onMouseout() {
			let el = this.$refs['infinite-scroll']
			if (!el) { return }
			let relatedTarget = event.relatedTarget
			if (relatedTarget !== el && !Util.contains(el, relatedTarget)) {
				this.isScrollStop = true
			}
		},
		onWheel(e) {
			if (this.scrolling) { return }
			this.scrolling = true
			setTimeout(() => {
				this.scrolling = false
				let el = this.$refs['infinite-scroll']
				if (e.deltaY > 0 && (el.clientHeight + el.scrollTop < el.scrollHeight)) {
					this.$emit('scrollTimes', ++this.scrollTimes)
					CollectApi.handleSend({p8: 'scroll', p9: this.scrollTimes, p12: 'page'})
				}
				if (this.finished) { return }
				console.log(`scrolling ${Math.random()}`)
				if (el.clientHeight + el.scrollTop + this.distance >= el.scrollHeight) {
					this.$emit('loadMore')
				}
			}, 500)
		}
	}
}
</script>