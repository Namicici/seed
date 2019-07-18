<style lang="less">
	.kso-pagination {
		display: flex;
		justify-content: space-around;
		align-items: center;
		&__left {
			height: 16px;
			width: 16px;
			cursor: pointer;
			.svg-arrow-left {
				cursor: pointer;
				width: 16px!important;
				height: 16px!important;
				color: #666;
			}
			&--disabled {
				.svg-arrow-left {
					color: #ccc;
				}
			}
		}
		&__content {
			display: flex;
			justify-content: space-around;
			align-items: center;
			margin-left: 16px;
			input {
				background: #fff;
				border: 1px solid #d9d9d9;
				border-radius: 4px;
				height: 22px;
				width: 48px;
				line-height: 22px;
				text-align: center;
			}
			p {
				margin-left: 16px;
			}
		}
		&__right {
			height: 16px;
			width: 16px;
			cursor: pointer;
			margin-left: 16px;
			.svg-arrow-right {
				cursor: pointer;
				width: 16px!important;
				height: 16px!important;
				transform: rotate(180deg);
				color: #666;
			}
			&--disabled {
				.svg-arrow-left {
					color: #ccc;
				}
			}
		}
	}
</style>
<template>
	<div class="kso-pagination">
		<div class="kso-pagination__left" :class="{'kso-pagination__left--disabled': pageNumber <= 1}" @click="onPre">
			<KsoSvgIcon svgName="svg-arrow-left" className="svg-arrow-left"></KsoSvgIcon>
		</div>
		<div class="kso-pagination__content">
			<input v-model="pageNumber" @keydown.enter="onChange" type="number" @blur="onBlur" @focus="onFocus" min="1" :max="totalNum" step="1"/>
			<p>/</p>
			<p>{{totalNum}}</p>
		</div>
		<div class="kso-pagination__right" :class="{'kso-pagination__right--disabled': pageNumber >= totalNum}" @click="onNext">
			<KsoSvgIcon svgName="svg-arrow-left" className="svg-arrow-right"></KsoSvgIcon>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'Pagination',
		props: {
			totalNum: Number,
			value: {
				type: [Number, String],
				default: 1
			}
		},
		data() {
			return {
				pageNumber: this.value,
				oldPageNumber: this.value
			}
		},
		watch: {
			value: function(val) {
				this.pageNumber = val
			}
		},
		methods: {
			onPre() {
				if (this.pageNumber <= 1) { return }
				this.pageNumber -= 1
				this.onChange()
			},
			onNext() {
				if (this.pageNumber >= this.totalNum) { return }
				this.pageNumber += 1
				this.onChange()
			},
			onBlur() {
				let reg = /^[1-9]*$/
				if (!reg.test(this.pageNumber)) {
					this.pageNumber = this.oldPageNumber
				}
				this.onChange()
			},
			onFocus() {
				this.oldPageNumber = this.pageNumber
			},
			onChange() {
				if (this.pageNumber <= 0) {
					this.pageNumber = 1
				}
				if (this.pageNumber > this.totalNum) {
					this.pageNumber = this.totalNum
				}
				this.$emit('input', this.pageNumber)
			}
		}
	}
</script>
