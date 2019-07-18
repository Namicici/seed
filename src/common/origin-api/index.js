let info = {
	//应用名
	appName: 'zjnull',
	//产品入口1
	entrance1: 'rknull',
	//产品入口2
	entrance2: 'cjnull',
	//产品标识
	tag: 'font19',
	//场景入口
	func: 'nullejy',
	//vip身份
	vip: 'novip',
	//用户职业身份
	profession: 'occmiss',
	//发布版本
	testVer: '',
	//算法 
	alg: '',
	// ABtest标识 |a| 二期
	abtest: '|a|',
	// 是否字体预览行为
	preview: 'nullvw'
}

const concat = p => p.filter(q => {
	return !!q
}).join('_')

export default {
	info,
	// 设置应用名
	setAppName(v) {
		info.appName = v || 'zjnull'
	},
	setEntrance(v1, v2) {
		info.entrance1 = v1 || 'rknull'
		info.entrance2 = v2 || 'cjnull'
	},
	// 设置功能名称
	setFunc(v) {
		info.func = v || 'nullejy'
	},
	// 设置最优先展示vip名称
	setVip(v) {
		info.vip = v || 'novip'
	},
	// 设置职业
	setProfession(v) {
		info.profession = v || 'occmiss'
	},
	setPreview(isInPreview) {
		info.preview = isInPreview ? 'view' : 'nullvw'
	},
	// 设置推荐算法标识
	setAlg(v) {
		info.alg = v
	},
	//获取会员来源
	getMemberCsource() {
		return concat([
			info.appName,
			info.tag,
			info.func
		])
	},
	// 全部字体的第一个运营位 position的值有 全部字体一个运营位：pic1	右上角会员续费按钮 renew  右上角会员开通按钮 dvipbtn
	getCsourceForSpecificPosition(position) {
		return concat([
			info.appName,
			info.tag,
			position
		])
	},
	//获取会员支付页面的会员位置
	getMemberPosition() {
		return concat([
			info.entrance1,
			info.tag,
			info.entrance2,
			info.preview,
			info.abtest,
			info.vip
		])
	},
	//获取零售sub_channel
	getSubChannel(position) {
		if (position) {
			return this.getCsourceForSpecificPosition(position)
		} else {
			return this.getMemberCsource()
		}
	},
	//获取零售channel
	getChannel() {
		return this.getMemberPosition()
	}
}