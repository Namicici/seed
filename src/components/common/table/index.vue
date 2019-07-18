<style lang="less">
	.kso-table {
		width: 100%;
		border: 1px solid #dedede;
		border-radius: 4px;
		table {
			width: 100%;
			border-collapse: collapse;
			thead {
				tr {
					background-color: #eee;
					height: 30px;
					line-height: 30px;
					th {
						text-align: center;
					}
				}
			}
			tbody {
				tr {
					td {
						text-align: center;
						&:first-child {
							border-left: none;
						}
					}
				}
			}
		}
	}
</style>
<template>
	<div class="kso-table">
		<table>
			<thead>
				<tr>
					<th v-for="(column, index) in columns" :key="index" :colspan="column.colSpan || 1" :style="{'width': column.width || 'auto'}">
						<slot :name="(column.slots && column.slots.name) || 'default'">
							<span>{{column.title}}</span>
						</slot>
					</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="record in dataSource" :key="record.key">
					<td v-for="(column, index) in columns" :key="index"  :style="{'max-width': column.maxWidth || 'auto', 'min-width': column.minWidth || 'auto'}">
						<slot v-if="column.scopedSlots" :name="column.scopedSlots.customRender" :record="record"></slot>
						<slot v-else>
							<span>{{record[column.key]}}</span>
						</slot>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
<script>
	export default {
		name: 'Table',
		props: {
			/**
			 * title - 表头每列名称
			 * colSpan - 占用列数
			 * key - 对应数据来源中的字段名称
			 * slots - 表头自定义
			 * scopedSlots - 自定义slot名称，这个是针对对应列的数据的
			 */
			columns: Array,
			/**
			 * key - 标识
			 */
			dataSource: Array
		},
		data() {
			return {}
		},
		methods: {

		}
	}
</script>
