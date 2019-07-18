import {
	ClientInfo,
	CollectInfo
} from 'config'
import Util from 'util'
import MD5 from '@/common/utils/md5'

const url = 'http://ic.wps.cn/wpsv6internet/infos.ads?v=D1S1E1&d='
// const op_url = 'http://info.meihua.docer.com/behavior/infos.ads?d='
const dm = 'dm=/2019/wps/client/app'
const action = 'action=ONLINE_FONT'
const screenWidth = window.screen.width
const screenHeight =  window.screen.height
// let sessionId = ''
let pageSource = ''
let upperEntrance = ''
export default {
	send(parg, num) {
		Util.getUserProfessionFinish.then(() => {
			// if (!sessionId) {
			// 	sessionId = MD5([Math.random() * 10e6, CollectInfo.userid, ClientInfo.hdid, new Date().getTime()])
			// }
			let guid = 'guid=' + ClientInfo.guid
			let hdid = 'hdid=' + ClientInfo.hdid
			let uuid = 'uuid=' + ClientInfo.uuid
			let userid = 'userid=' + CollectInfo.userid
			let version = 'version=' + ClientInfo.version
			let channel = 'channel=' + ClientInfo.dist
			let workboard = 'workboard=' + ClientInfo.name
			let p4 = 'p4=' + upperEntrance
			let p24 = 'p24=' + CollectInfo.userGroup
			let p25 = 'p25=' + CollectInfo.memberid
			let p26 = 'p26=' + screenWidth + '*' + screenHeight
			// let p27 = '' //精准策略
			// let p28 = 'p28=' + CollectInfo.profession
			// let p29 = 'p29=' + sessionId
			let pnum = 'pnum=' + (num + 4)

			let img = new Image()
			let param = Util.b64EncodeUnicode([dm, action, guid, hdid, uuid, version, channel, workboard, userid, parg, p4, p24, p25, p26, pnum].join('&'))
			let src = url + param
			console.log([dm, action, guid, hdid, uuid, version, channel, workboard, userid, parg, p4, p24, p25, p26, pnum].join('&'))
			img.src = src
			src = null
		})
	},
	// sendOP(oparg) {
	// 	Util.getUserProfessionFinish.then(() => {
	// 		let type = 'type=audio'
	// 		let app = 'app=audio'
	// 		let plat = 'plat=pc'
	// 		let func = 'func=wps_home'
	// 		let p1 = 'p1=all_use'
	// 		let hdid = 'hdid=' + ClientInfo.hdid
	// 		let img = new Image()
	// 		let param = Util.b64EncodeUnicode([type, app, oparg, plat, func, p1, hdid].join('&'))
	// 		let src = op_url + param
	// 		console.log([type, app, oparg, plat, func, p1].join('&'))
	// 		console.log(src)
	// 		img.src = src
	// 		src = null
	// 	})
	// },
	// handleSendOP(pObj) {
	// 	if (!pObj) { return }
	// 	let str = ''
	// 	for (var key in pObj) {
	// 		str += `&${key}=${pObj[key]}`
	// 	}
	// 	str = `${str.slice(1)}`
	// 	this.sendOP(str)
	// },
	createPayKey() {
		return MD5([Math.random() * 10e6, CollectInfo.userid, ClientInfo.hdid, new Date().getTime()])
	},
	handleSend(pObj) {
		let obj = Object.assign({},  {p1: pageSource}, pObj)
		let str = ''
		let i = 0
		for (var key in obj) {
			str += `&${key}=${obj[key]}`
			i++
		}
		str = `${str.slice(1)}`
		this.send(str, i)
	},
	setPageSource(source) {
		pageSource = source
	},
	setUpperEntrance(entry) {
		upperEntrance = entry
	}
}