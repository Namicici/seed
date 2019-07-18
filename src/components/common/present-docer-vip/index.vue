<style lang="less">
	@import (reference) "~@/assets/less/index";
	.kso-panel {
		text-align: center;
		&__title {
			margin-top: 44px;
			margin-bottom: 28px;
			font-size: 25px;
			color: rgba(0, 0, 0, 0.8);
		}
		&__footer {
			margin-top: 2px;
			/deep/ .kso-button {
				border-radius: 4px;
				width: 221px;
				height: 48px;
				font-size: 18px;
			}
		}
	}
	.kso-panel__body {
		width: 532px;
		margin: 0 auto;
		/deep/ .kso-privilege-card {
			float: left;
			margin-right: 32px;
			margin-bottom: 28px;
			&:nth-child(3n) {
				margin-right: 0px;
			}
			&:nth-child(4n) {
				margin-left: 85px;
			}
		}
	}
</style>
<template>
	<section class="kso-page-popup__container">
		<KsoPageStatus :stateCode="stateCode"></KsoPageStatus>
		<div class="kso-panel" v-show="stateCode != Netcode.loading">
			<div class="kso-panel__title" v-if="receivedGiftPackageStatus">成功领取{{ detail.days }}天稻壳会员，获得以下特权</div>
			<div class="kso-panel__title" v-else>不可重复领取！您获得优惠升级稻壳会员机会</div>
			<div class="kso-panel__body">
				<kso-privilege-card v-for="(item, index) in privileges" v-bind="item" :key="index"></kso-privilege-card>
			</div>
			<div class="kso-panel__footer">
				<KsoButton
					type="danger"
					v-docer-collect.display.hover="{el: 'open_vip'}"
					@click.native="handleClickUpgradeVip">
					{{adData.text || '升级正式会员立减20'}}
				</KsoButton>
			</div>
		</div>
	</section>
</template>
<script>
import KsoPrivilegeCard from './privilege-card/privilege-card'
import KsoButton from '@/components/common/button/index'
import {PaymentMixin, AdMixin} from '@/mixins'
import ServiceApi from 'serviceApi'
import {mapState} from 'vuex'
import {AdPosition, EventName, Netcode} from 'config'
import ClientApi from 'clientApi'
import CollectApi from 'collectApi'
import {ClientEvent} from 'eventApi'
export default {
	name: 'PagePopupPresentDocerVip',
	mixins: [PaymentMixin, AdMixin],
	components: {KsoPrivilegeCard, KsoButton},
	data() {
		return {
			stateCode: Netcode.loading,
			Netcode: Netcode,
			loadingAd: true,
			loadingData: true,
			receivedGiftPackageStatus: false,
			adData: {},
			detail: {
				days: 0,
				member: '稻壳会员'
			},
			privileges: [
				{
					icon: 'vip-icon',
					title: '图标素材',
					desc: '10000+款图标免费'
				},
				{
					icon: 'vip-mb',
					title: '模板素材',
					desc: '800万模板素材'
				},
				{
					icon: 'vip-font',
					title: '字体素材',
					desc: '10000+款字体免费'
				},
				{
					icon: 'vip-picture',
					title: '图片素材',
					desc: '10万+款图片免费'
				},
				{
					icon: 'vip-ppt-beautify',
					title: 'PPT美化',
					desc: '基于AI的一键美化'
				}
			],
			sourcePosition: '',
			payconfig: ''
		}
	},
	computed: {
		...mapState('user', {
			isLogin: 'isLogin'
		})
	},
	watch: {
		isLogin: {
			immediate: true,
			handler: function(newVal) {
				// 没有获取到用户的会员身份信息则退出
				if (!newVal) { return }
				this.getAdInfo()
			}
		},
		loadingData(newVal) {
			if (!newVal && !this.loadingAd) { this.stateCode = '' }
		},
		loadingAd(newVal) {
			if (!newVal && !this.loadingData) { this.stateCode = '' }
		}
	},
	methods: {
		getAdInfo() {
			const position = AdPosition.popupPresentVipBtnWord
			this.fetchAd({
				position: position
			}).then((res) => {
				let {rec} = (res[position] || {})
				if (!rec) { rec = [] }
				this.adData = rec[0] || {}
			}).finally(() => {
				this.loadingAd = false
			})
		},
		handleClickUpgradeVip() {
			if (!this.isLogin) {
				ClientApi.login()
				return false
			}
			let collectKey = CollectApi.createPayKey()
			console.log(`present docer vip ${collectKey}`)
			CollectApi.handleSend({p7: 'open_vip', p8: 'click', p12: 'open_vip', p13: collectKey})
			this.showPayment(collectKey, this.payconfig)
		},
		receiveFail() {
			this.receivedGiftPackageStatus = false
			CollectApi.handleSend({
				p8: 'display',
				p9: 'receive_fail_dvip_show'
			})
			this.loadingData = false
		},
		handleReceiveGiftPackage() {
			ServiceApi.get('ad').receiveGiftPackage({
				position: this.sourcePosition
			}).then((res) => {
				console.log(`handleReceiveGiftPackage`, res)
				if (res && res.result == 'ok' && res.data) {
					const {content_type = [], detail = {}} = res.data
					if (content_type.includes('member')) {
						const members = detail['member']
						if (!members.length) {
							this.receiveFail()
							return
						}
						const receivedMember = members[0]
						this.detail.days = receivedMember.days
					}
					this.receivedGiftPackageStatus = true
					CollectApi.handleSend({
						p8: 'display',
						p9: 'receive_success_dvip_show'
					})
					ClientApi.updateVipInfo()
					this.loadingData = false
				} else {
					this.receiveFail()
				}
			}).catch(() => {
				this.receiveFail()
			})
		}
	},
	mounted() {
		// 获取打开赠送弹窗的广告位标记：sourcePosition
		this.sourcePosition = this.$route.query.sourcePosition || ''
		this.payconfig = this.$route.query.payconfig
		this.handleReceiveGiftPackage()
	}
}
</script>
