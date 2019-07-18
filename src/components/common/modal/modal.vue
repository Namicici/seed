<style lang="less">
	@import "~@/assets/less/animation/index";
	.kso-modal {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 999;
		&__content {
			position: absolute;
			top: 50%;
			left: 50%;
			width: 380px;
			transform: translate(-50%, -50%);
			margin: auto;
			z-index: 9;
			background: #fff;
			box-shadow: 0 14px 40px 0 rgba(0, 0, 0, 0.3);
			border-radius: 4px;
			padding: 0 24px;
		}
		&__header {
			height: 68px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			&-title {
				font-size: 20px;
				color: #191919;
				text-align: left;
				line-height: 24px;
			}
			&-close {
				cursor: pointer;
			}
		}
		&__body {
			font-size: 14px;
		}
		&__footer {
			height: 74px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			&-operator {
				float: right;
			}
			&-button {
				min-width: 72px;
			}
		}
	}
</style>
<template>
	<div	class="kso-modal"
			:class="{'fade-in': visible, 'fade-out': !visible}"
			v-show="visible">
		<div class="kso-modal__content">
			<div class="kso-modal__header">
				<p class="kso-modal__header-title"><slot name="title">{{title}}</slot></p>
				<p class="kso-modal__header-close" @click="onClose" v-show="closable">
					<KsoSvgIcon :svgName="'svg-close2'" :className="'svg-close'"></KsoSvgIcon>
				</p>
			</div>
			<div class="kso-modal__body">
				<slot name="content">
					<p>{{content}}</p>
				</slot>
			</div>
			<div class="kso-modal__footer">
				<slot name="footer">
					<div></div>
					<div class="kso-modal__footer-operator">
						<KsoButton v-show="isCancel" @click.native="onCancel" type="flat" class="kso-modal__footer-button">{{cancelText}}</KsoButton>
						<KsoButton v-show="isOk" @click.native="onConfirm" class="kso-modal__footer-button">{{okText}}</KsoButton>
					</div>
				</slot>
			</div>
		</div>
	</div>
</template>
<script>
	import KsoButton from '@/components/common/button/index'
	export default {
		name: 'KsoModal',
		components: {KsoButton},
		props: {
			closable: {
				type: Boolean,
				default: true
			},
			isOk: {
				type: Boolean,
				default: true
			},
			isCancel: {
				type: Boolean,
				default: true
			},
			cancelText: {
				type: String,
				default: '取消'
			},
			okText: {
				type: String,
				default: '确定'
			},
			title: {
				type: String,
				default: ''
			},
			content: {
				type: String,
				default: ''
			},
			value: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				visible: this.value
			}
		},
		watch: {
			value: function(val) {
				this.visible = val
			}
		},
		methods: {
			onClose() {
				this.visible = false
				this.$emit('input', this.visible)
				this.$emit('on-close')
			},
			onCancel() {
				this.visible = false
				this.$emit('on-cancel')
			},
			onConfirm() {
				this.visible = false
				this.$emit('input', this.visible)
				this.$emit('on-ok')
			}
		}
	}
</script>
