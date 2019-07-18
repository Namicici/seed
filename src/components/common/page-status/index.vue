<template>
	<div class="kso-page-status" v-show="stateCode">
		<section class="kso-page-status__section kso-page-status__section-loading" v-show="stateCode == 'LOADING'">
			<slot name="loading">
				<img class="kso-page-status__loading-img" src="../../../assets/images/loading.gif"/>
				<p>加载中...</p>
			</slot>
		</section>
		<section class="kso-page-status__section kso-page-status__section-empty" v-show="stateCode == 'EMPTY'">
			<slot name="empty">
				<img class="kso-page-status__empty-img" src="../../../assets/images/empty-180.svg"/>
				<slot name="empty-text"></slot>
			</slot>
		</section>
		<section class="kso-page-status__section" v-show="stateCode == 'NETWORK_ERROR'">
			<slot name="network">
				<img class="kso-page-status__error-img" src="../../../assets/images/net-error-180.svg"/>
				<p>您的网络出走中</p>
			</slot>
			<a href="javascript:void(0)" @click="retry" class="kso-page-status__retry">
				<KsoSvgIcon :svgName="'svg-refresh'" :className="'svg-refresh'"></KsoSvgIcon>
				<span>刷新试试</span>
			</a>
		</section>
		<section class="kso-page-status__section kso-page-status__section-empty" v-show="stateCode == 'UNLOGIN'">
			<slot name="unlogin">
				<img class="kso-page-status__empty-img" src="../../../assets/images/empty-180.svg"/>
				<p>您还未登录</p>
			</slot>
			<a href="javascript:void(0)" @click="goLogin" class="kso-page-status__retry">
				<!-- <KsoSvgIcon :svgName="'svg-refresh'" :className="'svg-refresh'"></KsoSvgIcon> -->
				<span>登录</span>
			</a>
		</section>

		<!-- unlogin -->
	</div>
</template>
<style lang="less">
	@path: ~"~@/assets/images/";
	.kso-page-status {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		overflow: hidden;
		&__section {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			text-align: center;
			p {
				font-size: 14px;
				color: #333;
			}
			a {
				cursor: pointer;
				text-align: center;
				display: block;
				margin-top: 6px;
				text-decoration: none;
				color: #4779cd;
				font-size: 12px;
				span {
					vertical-align: middle;
					cursor: pointer;
				}
				&:hover {
					opacity: 0.7;
				}
			}
			img {
				max-width: 100%;
			}
			&-loading {
				img {
					max-width: 40px;
				}
			}
			&-empty {
				img {
					width: 180px;
				}
			}
		}
		.svg-refresh {
			vertical-align: bottom;
		}
	}
</style>
<script>
	import ClientApi from 'clientApi'
	export default {
		name: 'KsoPageStatus',
		props: {
			stateCode: String
		},
		data() {
			return {
				skeletonLoadingCounts: new Array(14)
			}
		},
		methods: {
			retry() {
				this.$emit('retry')
			},
			goLogin() {
				ClientApi.login()
			}
		}
	}
</script>