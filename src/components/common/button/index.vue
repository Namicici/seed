<style type="text/less" lang="less">
@color-wps: #6193e6;
@color-et: #54af59;
@color-wpp: #e8794b;
.kso-button {
	height: 32px;
	position: relative;
	border-radius: 4px;
	box-sizing: border-box;
	text-decoration: none;
	text-align: center;
	vertical-align: middle;
	border: 0px solid transparent;
	cursor: pointer;
	transition: all 0.2s ease-in-out;
	background-color: @color-wps;
	color: #fff;
	* {
		cursor: pointer;
	}
	&.is-disabled {
		cursor: not-allowed;
		* {
			cursor: not-allowed;
		}
	}
	&--small {
		display: inline-block;
		padding: 0 12px;
		height: 22px;
		line-height: 19px;
	}
	&--normal {
		display: inline-block;
		padding: 0 12px;
	}
	&--larger {
		display: block;
		width: 100%;
	}
	&__icon {
		vertical-align: middle;
		display: inline-block;
	}
	&--default {
		&.is-plain {
			border: 1px solid #ccc;
			background: #fff;
			color: #666;
			&:hover:not(.is-disabled) {
				background: #f2f2f2;
				border: 1px solid #b2b2b2;
			}
			&:active:not(.is-disabled) {
				background: #e5e5e5;
				border: 1px solid #999;
			}
			&.is-disabled {
				border: 1px solid #e5e5e5;
				color: #ccc;
			}
		}
	}
	&--danger {
		color: #fff;
		background-color: #eb4e2f;
		&:hover:not(.is-disabled) {
			background-color: #f76925;
		}
		&:active:not(.is-disabled) {
			background-color: #e24728;
		}
	}
	&--warning {
		color: #fff;
		background-color: #f05e37;
		&:hover:not(.is-disabled) {
			background-color: #f66c47;
		}
		&:active:not(.is-disabled) {
			background-color: #df4f29;
		}
	}
	&--wpp {
		color: @color-wpp;
		background-color: none;
		border: solid 1px @color-wpp;
		&:hover:not(.is-disabled) {
			color: #fff;
			background-color: @color-wpp;
		}
		&:active:not(.is-disabled) {
			opacity: 0.8;
		}
		&.is-disabled {
			opacity: 0.4;
		}
	}
	&--et {
		color: @color-et;
		background-color: none;
		border: solid 1px @color-et;
		&:hover:not(.is-disabled) {
			background-color: @color-et;
			color: #fff;
		}
		&:active:not(.is-disabled) {
			opacity: 0.8;
		}
		&.is-disabled {
			opacity: 0.4;
		}
	}
	&--wps {
		color: @color-wps;
		background-color: none;
		border: solid 1px @color-wps;
		&:hover:not(.is-disabled) {
			color: #fff;
			background-color: @color-wps;
		}
		&:active:not(.is-disabled) {
			opacity: 0.8;
		}
		&.is-disabled {
			opacity: 0.4;
		}
	}
	&--white {
		color: #eb4e2f;
		background: #fff;
		&:hover:not(.is-disabled) {
			background: #f1f1f1;
		}
		&:active:not(.is-disabled) {
			background: #e3e3e3;
		}
		&.is-disabled {
			background: #f1f1f1;
			color: #ccc;
		}
	}
	&--text {
		height: auto;
		border-color: transparent;
		color: #5789d9;
		background: transparent;
		padding-left: 0;
		padding-right: 0;
		&:hover:not(.is-disabled) {
			opacity: 0.95;
		}
		&:active:not(.is-disabled) {
			opacity: 0.8;
		}
		&.is-disabled {
			opacity: 0.4;
		}
	}
	&--warning-text {
		height: auto;
		border-color: transparent;
		color: #b58d17;
		background: transparent;
		padding-left: 0;
		padding-right: 0;
		&:hover:not(.is-disabled) {
			opacity: 0.95;
		}
		&:active:not(.is-disabled) {
			opacity: 0.8;
		}
		&.is-disabled {
			opacity: 0.4;
		}
	}
	&--flat {
		background-color: transparent!important;
		border: solid 1px #ccc;
		color: currentColor;
		&:hover:not(.is-disabled) {
			background: #f2f2f2;
			border: 1px solid #b2b2b2;
		}
		&:active:not(.is-disabled) {
			background: #f2f2f2;
			border: 1px solid #999;
		}
	}
}
</style>
<template>
	<button class="kso-button" :class="customClass">
		<span class="kso-button__icon" v-if="icon || $slots.icon">
			<slot name="icon">
				<i v-if="icon" class="i-icon" :class="'i-icon-' + icon"></i>
			</slot>
		</span>
		<label class="kso-button__text"><slot></slot></label>
	</button>
</template>
<script>
export default {
	name: 'KsoButton',
	props: {
		type: {
			type: String,
			default: 'default',
			validator(value) {
				return [
					'default',
					'white',
					'primary',
					'success',
					'danger',
					'warning',
					'wps',
					'wpp',
					'et',
					'text',
					'warning-text',
					'flat'
				].indexOf(value) > -1
			}
		},
		size: {
			type: String,
			default: 'normal',
			validator() {
				return [
					'small',
					'normal',
					'larger'
				]
			}
		},
		plain: Boolean,
		disabled: Boolean,
		icon: String
	},
	computed: {
		customClass() {
			console.log(`customclass ${this.type}`)
			let types = this.type.split(' ')
			let typeCss = []
			for (let i = 0; i < types.length; i++) {
				typeCss.push(`kso-button--${types[i]}`)
			}
			return [
				`kso-button--${this.size}`,
				...typeCss,
				// `kso-button--${this.type}`,
				{
					'is-plain': this.plain,
					'is-disabled': this.disabled
				}
			]
		}
	}
}
</script>
