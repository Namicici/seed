import DataService from './util'
import {Service} from 'config'

let serviceApi = new DataService()
serviceApi.add('small_win', Service.baseUrl.fontUrl, {
	/**
	 * 小窗推荐字体
	 * @//font.docer.wps.cn/font/api/client/poprecommend
	 * @param {Number} page
	 * @param {Number} limit
	 */
	recommend: {
		method: 'get',
		url: '/api/client/poprecommend_v2',
		data: {
			page: 1,
			limit: 50
		}
	},
	/**
	 * 小窗最近使用字体详情
	 * @//font.docer.wps.cn/font/api/client/fontsinfo
	 * @param {String} ids - XXXX:XXXX:XXXX
	 */
	historyFont: {
		method: 'get',
		url: '/api/client/fontsinfo_v2',
		noEncode: true
	},
	/**
	 * 小窗最近使用字体（目前暂未使用）
	 */
	recentFont: {
		method: 'get',
		url: '/api/client/latestuse',
		data: {
			offset: 1,
			limit: 5
		}
	}
})

serviceApi.add('font', Service.baseUrl.fontUrl, {
	/**
	 * 大窗搜索
	 * @//font.docer.wps.cn/font/search_v3
	 * @param {Number} is_edu - PanelApi.isEductionVersion()根据客户端返回如果isEduction ? 1 : 0
	 * @param {Number} limit
	 * @param {Number} offset
	 * @param {String} partner - 厂商名字，默认为空
	 * @param {Number} lateuse - 是否最近使用 1 是  0 否
	 * @param {String} keywords
	 * @param {String} condition - 一级分类的值
	 * @param {String} tag - 二级分类， 分号分隔
	 * @param {String} type - 在线字库取font
	 * @param {Number} is_preview - 0 非预览 1 预览
	 * @param {Number} preview_type - 0 自定义 1 数字 2 字符 3 反色差
	 * @param {String} text - 预览内容
	 * @param {String} size - 字号
	 * @param {Number} v - 1,用于是否对老版本进行零售字体过滤标记业务，小于1或不存在则过滤，大于等于1不过滤
	*/
	search: {
		method: 'get',
		url: '/search_v3',
		noEncode: true,
		data: {
			offset: 1,
			limit: 9,
			v: 1,
			type: 'font',
			lateuse: 0,
			partner: ''
		}
	},
	/**
	 * 获取主题字体
	 * @param {Number} is_preview - 0 非预览 1 预览
	 * @param {Number} preview_type - 0 自定义 1 数字 2 字符 3 反色差
	 * @param {String} text - 预览内容
	 * @param {String} size - 字号
	 * @param {String} collection_mb_id - 专题id
	 */
	themeFonts: {
		method: 'get',
		url: '/api/mall/zt_font'
	},
	/**
	 * 授权内容地址url（暂未使用）
	 * @//font.docer.wps.cn/font/authorize
	 * @param {String} id
	 */
	getAuthorizeUrl: {
		method: 'get',
		url: '/authorize'
	},
	/**
	 * 已购云字体列表
	 * @//font.docer.wps.cn/font/buy_ids
	 */
	purchasedList: {
		method: 'get',
		url: `/buy_ids`,
		cache: false
	},
	/**
	 * 下载过的id列表
	 * @//font.docer.wps.cn/font/download_ids
	 */
	downloadIds: {
		method: 'get',
		url: '/download_ids',
		cache: false
	},
	/**
	 * 分类接口
	 * @//font.docer.wps.cn/font/rec_cate
	 */
	getCategories: {
		method: 'get',
		url: `/rec_cate`
	},
	/**
	 * 推荐搜索
	 * @//font.docer.wps.cn/font/dashboard_rec
	 */
	getRecommandKeywords: {
		method: 'get',
		url: '/dashboard_rec'
	},
	/**
	 * 搜索页面的推荐字体
	 * @//font.docer.wps.cn/font/api/mall/rec_font
	 */
	getRecFonts: {
		method: 'get',
		url: '/api/mall/rec_font'
	},
	/**
	 * 获取收藏的ids
	 * @//font.docer.wps.cn/font/collect_ids
	 */
	favIds: {
		method: 'get',
		url: '/collect_ids',
		cache: false
	},
	/**
	 * 获取收藏列表
	 * @//font.docer.wps.cn/font/collect_list
	 * @param {String} order_by - time 时间倒序  favor 收藏数  download 下载数
	 * @param {String} keyword - 关键词
	 * @param {Number} is_preview - 0 非预览 1 预览
	 * @param {Number} preview_type - 0 自定义 1 数字 2 字符 3 反色差
	 * @param {String} text - 预览内容
	 * @param {String} size - 字号
	 */
	collectList: {
		method: 'get',
		url: '/collect_list',
		noEncode: true,
		data: {
			limit: 9
		}
	},
	/**
	 * 获取下载列表
	 * @//font.docer.wps.cn/font/download_list
	 * @param {String} order_by - 1 限时免费  2 稻壳会员免费  3 零售字体
	 * @param {String} keyword
	 * @param {Number} is_preview - 0 非预览 1 预览
	 * @param {Number} preview_type - 0 自定义 1 数字 2 字符 3 反色差
	 * @param {String} text - 预览内容
	 * @param {String} size - 字号
	 */
	downloadList: {
		method: 'get',
		url: '/download_list',
		noEncode: true,
		data: {
			limit: 9
		}
	},
	/**
	 * 商用授权书列表
	 */
	commercialAuthList: {
		method: 'get',
		url: '/commercialAuthList',
		data: {
			limit: 9
		}
	}
})

serviceApi.add('user', '', {
	/**
	 * 获取用户身份【机器的非用户】
	 * @//docer.wps.cn/partner.php/api/startup/v2/pro_recommend/profession
	 * @param {number} mb_app - 'wps': 1, 'et': 2, 'wpp': 3
	 * @param {string} uuid
	 * @param {string} hdid
	 * @param {string} guid
	 * @param {string} cv - 'tag_group'
	 * @param {string} pro_version - 教育版：'edu', 否则为''
	 */
	profession: {
		method: 'GET',
		url: `${Service.baseUrl.docerStartup}/v2/pro_recommend/profession`
	},
	/**
	 * 获取用户所有信息
	 * @//docer.wps.cn/v3.php/api/user/allinfo
	 */
	allinfo: {
		method: 'get',
		cache: true,
		url: `${Service.baseUrl.docerV4Url}/api/user/allinfo`
	},
	/**
	 * 用户最后一次购买会员时间（暂未使用）
	 * @//docer.wps.cn/v3.php/api/user/user_identity
	 */
	getLastBuyVipTime: {
		method: 'GET',
		url: `${Service.baseUrl.docerV3Url}/api/user/user_identity`
	},
	/**
	 * 获取用户会员身份，包含试用会员过期
	 * 接口文档：http://docer.apidoc.com/docer_wps_cn/doc/#api-v3_user-member_identity
	 * URL: http://docer.wps.cn/v3.php/api/user/member_identity
	 * METHOD: get
	 * @return {object} {supervip, docervip, wpsvip}
	 */
	getUserMemberIdentity: {
		method: 'get',
		url: `${Service.baseUrl.docerV3Url}/api/user/member_identity`
	}
})

serviceApi.add('download', `${Service.baseUrl.docerV3Url}`, {
	/**
	 * 资源下载地址获取接口
	 * @//docer.wps.cn/v3.php/api/download
	 * @param {string} id - 模板id
	 * @param {string} channel - 来自支付来源规范
	 * @param {string} sub_channel - 来自支付来源规范
	 * @param {string} uuid
	 * @param {string} hdid
	 * @param {string} guid
	 * @param {string} version - 客户端版本
	 * @param {string} dist - 客户端dist
	 * @param {string} sn - 特权下载：privilege， 否则为''
	 * @param {string} position - 来自支付来源规范
	 * @param {string} img_url
	 * @param {string} client_type - 一般来自支付来源规范，后端可自定义
	 * @param {string} from - 一般取支付来源规范值
	 */
	download: {
		method: 'post',
		url: '/api/font/download'
	}
})

serviceApi.add('collect', `${Service.baseUrl.docerV3Url}/wpp/ajax`, {
	/**
	 * 添加收藏
	 * @//docer.wps.cn/v3.php/wpp/ajax/add_fav
	 * @param {String} moban_id - id
	 */
	add: {
		method: 'post',
		url: '/add_fav',
		data: {
			platform: 6,
			file_type: 1
		}
	},
	/**
	 * 取消收藏
	 * @//docer.wps.cn/v3.php/wpp/ajax/del_fav
	 * @param {String} ids - id
	 */
	del: {
		method: 'post',
		url: '/del_fav'
	}
})

serviceApi.add('ad', '', {
	/**
	 * 获取广告信息
	 * @//recom.docer.wps.cn/recommend
	 * 详情见api文档：http://docer.apidoc.com/recom_docer_wps_cn/doc/#api-recommend-index
	 * 需绑定host:
	 * 120.92.19.197 docer.apidoc.com
	 * @param {Number} cid - 应用id，wps android 5; wps pc 10. 默认10
	 * @param {String} from - 来源，不传
	 * @param {String} position -  标记，多个可用分号分隔
	 * @param {String} user_type - 	// 用户类型，多个可用分号分隔。10注册用户 12稻会 20wps会员 40超会 112过期稻会 120过期wps会员 140过期超会 
	 * 								// 1120 1200 1400分别为稻会 wps会 超会当天过期 1121 1201 1401分别为稻会 wps会 超会还有1天过期 
	 * 								// 1123 1203 1403分别为稻会 wps会 超会还有3天过期 1127 1207 1407分别为稻会 wps会 超会还有7天过期
	 * @param {String} guid
	 * @param {String} hdid
	 * @param {String} uuid
	 * @param {String} user_id
	 * @param {Number} mb_app - 组件id 1文字 2表格 3演示
	 * @param {Number} zt_id - 专题id
	 * @param {String} keyword -  匹配词。不为空时才去匹配，和note
	 */
	getAdInfo: {
		method: 'post',
		url: `${Service.baseUrl.recomUrl}/recommend`,
		data: {
			cid: 10,
			from: '',
			zt_id: 0,
			keyword: ''
		}
	},
	/**
	 * 获取礼包领取的状态
	 * http://wikivas.wps.kingsoft.net/pages/viewpage.action?pageId=4030919
	 * 测试环境 Host： 123.59.33.175 vip.wps.cn
	 * @param {String} group
	 */
	// getGiftPackageReceivingStatus: {
	// 	method: 'post',
	// 	url: '/gift_package/user/status',
	// 	data: {
	// 		group: 'font'
	// 	}
	// },
	/**
	 * 【需登陆】广告位礼包领取
	 * @//docer.wps.cn/v3.php/api/user/get_vip_package
	 * http://docer.apidoc.com/docer_wps_cn/doc/#api-v3_user-get_vip_package
	 * @param {string} source_type - 来源类型。
	 * @param {string} client_type - 是否返回领取明细，1是0否
	 * @param {number} return_detail - 是否返回领取明细，1是0否
	 * @param {string} position - 领取来源，用于区分同一个礼包不同领取来源；同广告位标记position
	 */
	receiveGiftPackage: {
		method: 'get',
		url: `${Service.baseUrl.docerV3Url}/api/user/get_vip_package`,
		data: {
			source_type: 'font',
			client_type: 'wps_client',
			return_detail: 1
		}
	}
})

export default serviceApi