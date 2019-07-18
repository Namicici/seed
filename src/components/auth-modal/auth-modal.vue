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
				:title="options.title"
				:content="options.content">
		<KsoCheckbox slot="footer" v-model="options.isAuth"><span>同意授权范围</span></KsoCheckbox>
		<KsoButton slot="footer" @click.native="onConfirm" class="kso-auth__button">{{buttonText}}</KsoButton>
	</KsoModal>
</template>
<script>
	import KsoModal from '@/components/common/modal/modal.vue'
	import KsoCheckbox from '@/components/common/checkbox/index'
	import KsoButton from '@/components/common/button/index'
	import CollectApi from 'collectApi'
	export default {
		name: 'KsoAuthModal',
		components: {KsoModal, KsoCheckbox, KsoButton},
		data() {
			return {
				visible: false,
				options: {
					isGlobal: false,
					isAuth: true,
					continueDownload: false,
					font: null,
					title: '授权范围说明',
					content: '许可字库及其中的字体仅限于您通过WPS Office办公软件为您的个人非商业目的进行使用，使用方式仅限屏幕显示和打印；您不得将许可字库及其中的字体向第三方或为第三方的利益而修改、翻译、复制、发行、销售、许诺销售、出租、通过信息网络进行传播或以其他形式进行使用。'
				}
			}
		},
		computed: {
			buttonText() {
				return this.options.continueDownload && this.options.isAuth ? '继续下载' : '确定'
			}
		},
		methods: {
			onConfirm() {
				if (this.options.continueDownload) {
					if (this.options.onDownload) {
						if (!this.options.isGlobal) {
							CollectApi.handleSend({p7: 'authority_news_popup_wins', p8: 'click', p9: this.options.isAuth ? 'agree' : 'disagree', p20: 'download'})
						} else {
							CollectApi.handleSend({p1: 'global_operations_bar', p7: 'authority_news_popup_wins', p8: 'click', p9: this.options.isAuth ? 'agree' : 'disagree', p20: 'download'})
						}
						this.options.onDownload(this.options.isAuth, this.options.font)
					}
					this.visible = false
					return
				}
				if (this.options.onOk) {
					if (!this.options.isGlobal) {
						CollectApi.handleSend({p7: 'authority_news_popup_wins', p8: 'click', p9: this.options.isAuth ? 'agree' : 'disagree'})
					} else {
						CollectApi.handleSend({p1: 'global_operations_bar', p7: 'authority_news_popup_wins', p8: 'click', p9: this.options.isAuth ? 'agree' : 'disagree'})
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
					CollectApi.handleSend({p7: 'authority_news_popup_wins', p8: 'display'})
				} else {
					CollectApi.handleSend({p1: 'global_operations_bar', p7: 'authority_news_popup_wins', p8: 'display'})
				}
				
			}
		}
	}
</script>
