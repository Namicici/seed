<style lang="less">
	@import "~@/assets/less/base/variables.less";
	.auth-intro {
		position: absolute;
		top: 14px;
		right: 14px;
		z-index: 1;
		border-radius: 10px;
		padding: 0 8px;
		height: 21px;
		line-height: 19px;
		cursor: pointer;
		.svg-tip {
			vertical-align: middle;
			stroke: @text-color;
			color: @text-color;
		}
		p {
			display: inline-block;
			vertical-align: middle;
		}
		&:hover {
			color: @color-primary;
		}
	}
</style>
<template>
	<div class="auth-intro" @click="popAuth" v-docer-collect.display="{el: 'authority_news_popup_wins'}">
		<KsoSvgIcon :svgName="'svg-tip'" :className="'svg-tip'"></KsoSvgIcon>
		<p>字体授权说明</p>
	</div>
</template>
<script>
	import {mapActions} from 'vuex'
	import CollectApi from 'collectApi'
	export default {
		name: 'AuthInstro',
		methods: {
			...mapActions('user', {
				setAuthAgree: 'setAuthAgree'
			}),
			popAuth() {
				this.$authModal.show({
					onOk: (agree) => {
						CollectApi.handleSend({p7: 'authority_news_popup_wins', p8: 'click', p9: agree ? 'agree' : 'disagree'})
						this.setAuthAgree(agree)
					}
				})
			}
		}
	}
</script>