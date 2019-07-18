<style lang="less">
	.kso-privilege-card {
		width: 156px;
		height: 170px;
		text-align: center;
		border: 1px solid #fdad6e;
		box-shadow: 0 3px 11px 0 #f2f2f2;
		border-radius: 6px;
		background: url("bg-border.png") no-repeat center center;
		&__icon {
			margin: 30px auto 17px;
			width: 60px;
			height: 60px;
			border-radius: 50%;
			background-image: linear-gradient(60deg, #fdad2e 3%, #ffd571 100%);
			display: flex;
			align-items: center;
			text-align: center;
			justify-content: center;
			.i-icon {
				color: #fff;
				font-size: 36px;
				width: 36px;
				height: 36px;
			}
		}
		&__title {
			opacity: 0.8;
			font-size: 14px;
			color: #191919;
			margin-bottom: 10px;
		}
		&__desc {
			font-size: 12px;
			color: #999;
		}
	}
</style>
<template>
	<div class="kso-privilege-card">
		<div class="kso-privilege-card__icon">
			<KsoSvgIcon :svgName="icon" :className="'i-icon'" :width="'36px'" :height="'36px'"></KsoSvgIcon>
		</div>
		<div class="kso-privilege-card__title">{{ title }}</div>
		<div class="kso-privilege-card__desc">{{ desc }}</div>
	</div>
</template>
<script>
	export default {
		name: 'KsoPrivilegeCard',
		props: {
			icon: {
				type: String,
				default: ''
			},
			title: {
				type: String,
				default: ''
			},
			desc: {
				type: String,
				default: ''
			}
		}
	}
</script>
