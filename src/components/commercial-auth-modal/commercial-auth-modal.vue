<style lang="less">
	.kso-auth {
		span {
			vertical-align: middle;
		}
		&__button {
			width: 80px;
		}
	}
</style>
<template>
	<KsoModal   class="kso-auth" ref="kso-authmodal"
				@onCancel="onCancel"
				v-model="visible"
				:title="options.title">
		<div slot="content">
			<p>许可字库及其中的字体仅限于您通过WPS Office办公软件为您的特点范围内的商业目的进行使用，使用方式仅限于一下途径：</p>
			<p>微博、微信、网络广告、视频广告、H5、短视频、个人网店、企业网点、海报、宣传册、说明书、楼书、APP、TVC、易拉宝、活动PPT、企业年报、报纸期刊、户外广告、IP视觉ICON、直播、抖音、映客、快手。</p>
			<p>您不得将许可字库及其中的字体使用在以下途径：</p>
			<p>电影、电视剧、网剧、专题节目、滚动式影视节目、LOGO、slogan、包装、VI表中字等途径；如有以上途径需求请向字库版权方进行购买。</p>
		</div>
		<KsoCheckbox slot="footer" v-model="options.isAuth"><span>同意授权范围</span></KsoCheckbox>
		<KsoButton slot="footer" @click.native="onConfirm" class="kso-auth__button">确认</KsoButton>
	</KsoModal>
</template>
<script>
	import KsoModal from '@/components/common/modal/modal.vue'
	import KsoCheckbox from '@/components/common/checkbox/index'
	import KsoButton from '@/components/common/button/index'
	import CollectApi from 'collectApi'
	export default {
		name: 'KsoCommercialAuthModal',
		components: {KsoModal, KsoCheckbox, KsoButton},
		data() {
			return {
				visible: false,
				options: {
					isGlobal: false,
					isAuth: false,
					font: null,
					title: '商用授权范围'
				}
			}
		},
		methods: {
			onConfirm() {
				if (this.options.onOk) {
					if (!this.options.isGlobal) {
						CollectApi.handleSend({p7: 'authority_news_popup_wins_business', p8: 'click', p9: this.options.isAuth ? 'agree' : 'disagree'})
					} else {
						CollectApi.handleSend({p1: 'global_operations_bar', p7: 'authority_news_popup_wins_business', p8: 'click', p9: this.options.isAuth ? 'agree' : 'disagree'})
					}
					this.options.onOk(this.options.isAuth, this.options.font)
				}
				this.visible = false
			},
			onCancel() {
				this.visible = false
			},
			show(options) {
				options.isGlobal = !!options.isGlobal
				this.options = Object.assign(this.options, options)
				this.options.isAuth = true
				this.visible = true
				if (!this.options.isGlobal) {
					CollectApi.handleSend({p7: 'authority_news_popup_wins_business', p8: 'display'})
				} else {
					CollectApi.handleSend({p1: 'global_operations_bar', p7: 'authority_news_popup_wins_business', p8: 'display'})
				}
				
			}
		}
	}
</script>
