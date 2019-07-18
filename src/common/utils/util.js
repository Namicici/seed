import Utf8 from './utf8.js'
import {EventName} from 'config'
import Observe from '@/common/event-api/observe'


const isType = function(obj) {
	if (obj == null) {
		return obj + ""
	}

	return typeof obj === "object" || typeof obj === "function" ? {}[toString.call(obj)] || "object" : typeof obj
}

const isPlainObject = function(obj) {
	var proto, Ctor
	if (!obj || {}.toString.call(obj) !== "[object Object]") {
		return false
	}

	proto = Object.getPrototypeOf(obj)
	if (!proto) {
		return true
	}

	Ctor = {}.hasOwnProperty.call(proto, "constructor") && proto.constructor
	return typeof Ctor === "function" && {}.hasOwnProperty.toString.call(Ctor) === {}.hasOwnProperty.toString.call(Object)
}

const extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false

	// Handle a deep copy situation
	if (typeof target === "boolean") {
		deep = target

		// Skip the boolean and the target
		target = arguments[i] || {}
		i++
	}

	// Handle case when target is a string or something (possible in deep copy)
	if (typeof target !== "object" && !isType(target) === "function") {
		target = {}
	}

	// Extend jQuery itself if only one argument is passed
	if (i === length) {
		target = this
		i--
	}

	for (; i < length; i++) {

		// Only deal with non-null/undefined values
		options = arguments[i]
		if (options != null) {

			// Extend the base object
			for (name in options) {
				src = target[name]
				copy = options[name]

				// Prevent never-ending loop
				if (target === copy) {
					continue
				}

				// Recurse if we're merging plain objects or arrays
				copyIsArray = Array.isArray(copy)
				if (deep && copy && (isPlainObject(copy) || copyIsArray)) {

					if (copyIsArray) {
						copyIsArray = false
						clone = src && Array.isArray(src) ? src : []

					} else {
						clone = src && isPlainObject(src) ? src : {}
					}

					// Never move original objects, clone them
					target[name] = extend(deep, clone, copy)

					// Don't bring in undefined values
				} else if (copy !== undefined) {
					target[name] = copy
				}
			}
		}
	}

	// Return the modified object
	return target
}

function supportWebp() {
	try {
		return (document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') == 0)
	} catch (err) {
		return false
	}
}
export const cropSuffix = supportWebp() ? '.webp' : '.jpg'

const isEmptyObject = function(obj) {
	var name
	for (name in obj) {
		return false
	}
	return true
}

const getRoutePath = function(path) {
	var reg = /[^/]\w*[^/?]/g
	path = path && path.match(reg)
	return path ? path : []
}

const getUrlParam = function(url, name) {
	var reg = new RegExp('(^|\\?|&)' + name + '=([^&]*)(\\s|&|$)', 'i')
	if (reg.test(url || location.href)) {
		return decodeURIComponent(RegExp.$2.replace(/\+/g, ' '))
	}
	return ''
}

const convertAppMark = function(appMark) {
	return {
		1: 'wps',
		2: 'et',
		3: 'wpp'
	}[appMark] || ''
}

const convertAppName = function(appName) {
	appName = appName && appName.toLowerCase() || appName
	return {
		'wps': 1,
		'et': 2,
		'wpp': 3
	}[appName] || ''
}

const b64EncodeUnicode = function(str) { //base64编码
	return btoa(Utf8.encode(str))
}

const b64DecodeUnicode = function(str) { //base64解码
	return Utf8.decode(atob(str))
}

const jsonToQuery = function(obj) {
	if (!obj || isEmptyObject(obj)) {
		return ''
	}
	let str = ''
	for (var key in obj) {
		str += `&${key}=${encodeURIComponent(obj[key])}`
	}
	return `${str.slice(1)}`
}

const animate = (elem, style, unit, from, to, time, prop) => {
	if (!elem) {
		return
	}
	let start = Date.now()

	function frame() {
		var step = Math.min(1, (Date.now() - start) / time)
		if (prop) {
			elem[style] = (from + step * (to - from)) + unit
		} else {
			elem.style[style] = (from + step * (to - from)) + unit
		}
		if (step !== 1) {
			window.requestAnimationFrame(frame)
		}
	}
	window.requestAnimationFrame(frame)
}

const scrollTo = function(ele, position, speed = 500) {
	animate(ele, 'scrollTop', '', ele.scrollTop, position, speed, true)
}

/**
 * 对日期进行格式化，
 * @param date 要格式化的日期
 * @param format 进行格式化的模式字符串
 */
const dateFormat = function(date, format, isPhpTimeStamp) {
	if (isPhpTimeStamp) {
		date = date * 1000
	}
	date = new Date(date)
	var map = {
		"M": date.getMonth() + 1,
		"d": date.getDate(),
		"h": date.getHours(),
		"m": date.getMinutes(),
		"s": date.getSeconds(),
		"q": Math.floor((date.getMonth() + 3) / 3),
		"S": date.getMilliseconds()
	}
	format = format.replace(/([yMdhmsqS])+/g, function(all, t) {
		var v = map[t]
		if (v !== undefined) {
			if (all.length > 1) {
				v = '0' + v
				v = v.substr(v.length - 2)
			}
			return v
		} else if (t === 'y') {
			return (date.getFullYear() + '').substr(4 - all.length)
		}
		return all
	})
	return format
}

const debounce = function(delay) {
	let timeout = null
	let lastRun = 0
	return function(action, ...args) {
		if (!lastRun) {
			lastRun = Date.now()
		}
		let elapsed = Date.now() - lastRun
		let runCallback = function() {
			lastRun = null
			timeout = null
			action.apply(window, args)
		}

		timeout && clearTimeout(timeout)
		timeout = setTimeout(runCallback, delay - elapsed)

	}
}

/**
 * 检查是否滚动到底部
 * @param scrollEl 滚动元素（原生）
 * @param contentEl 内容元素（原生）
 * @param distance 距离，默认100px
 */
const checkScrollBottom = (scrollEl, contentEl, distance = 100) => {
	if (!scrollEl || !contentEl) { return }
	let scrollTop = scrollEl.scrollTop
	let scrollHeight = scrollEl.clientHeight
	let contentHeight = contentEl.clientHeight

	// 内容一屏显示所有
	if (contentHeight <= scrollHeight) {
		return true
	} else {
		return scrollTop + scrollHeight + distance >= contentHeight
	}
}

const convertComponentName = (key) => {
	return {
		'wps': 'writer',
		'et': 'et',
		'wpp': 'wpp'
	}[key]
}

const obj2qs = (obj) => {
	let str = ''
	if (Object.prototype.toString.call(obj).toLowerCase() === '[object object]') {
		let arr = []
		Object.entries(obj).forEach((o) => {
			let value = o && o[1]
			if (typeof value !== 'undefined' && value !== '' && value !== null) {
				arr.push(o.join('='))
			}
		})
		str = arr.join('&')
	}
	return str
}

// function getByteLen(val) {
// 	var len = 0
// 	for (var i = 0; i < val.length; i++) {
// 		var patt = new RegExp(/[^\x00-\xff]/ig)
// 		var a = val[i]
// 		if (patt.test(a)) {
// 			len += 2
// 		} else {
// 			len += 1
// 		}
// 	}
// 	return len
// }

const contains = document.documentElement.contains ? function(parent, node) {
	return parent !== node && parent.contains(node)
} : function(parent, node) {
	let result = parent !== node

	if (!result) {
		return result
	}
	if (result) {
		while (node) {
			if (parent === node) {
				return true
			}
			node = node.parentNode
		}
	}
	return false
}



let getUserProfessionResolve, isFinishProfession, isFinishUserInfo, getUserinfoResolve, getProfessionResolve

let getUserProfessionFinish = new Promise((resolve) => {
	getUserProfessionResolve = resolve
})

function generateUserInfoPromise() {
	return new Promise((resolve) => {
		getUserinfoResolve = resolve
	})
}

let getUserInfoFinish = generateUserInfoPromise()

const getProfessionFinish = new Promise((resolve) => {
	getProfessionResolve = resolve
})

Observe.$on(EventName.startUpdateUserInfo, () => {
	getUserinfoResolve()
	console.log(`event name start`, getUserInfoFinish)
	getUserInfoFinish = generateUserInfoPromise()
})

Observe.$on(EventName.finishProfession, () => {
	isFinishProfession = true
	getProfessionResolve()
	if (isFinishUserInfo) {
		getUserProfessionResolve()
	}
})
Observe.$on(EventName.finishUserInfo, () => {
	console.log(`finish user info in util`)
	isFinishUserInfo = true
	getUserinfoResolve()
	if (isFinishProfession) {
		getUserProfessionResolve()
	}
})

const getFileNameForPath = function(pathString) {
	return (pathString + '').replace(/.*(\\|\/)(.*$)/g, '$2')
}

export default {
	extend,
	cropSuffix,
	getRoutePath,
	getUrlParam,
	convertAppMark,
	convertAppName,
	b64EncodeUnicode,
	b64DecodeUnicode,
	jsonToQuery,
	scrollTo,
	dateFormat,
	isEmptyObject,
	debounce,
	checkScrollBottom,
	convertComponentName,
	obj2qs,
	isPlainObject,
	// getByteLen,
	contains,
	getUserInfoFinish,
	getProfessionFinish,
	getUserProfessionFinish,
	getFileNameForPath
}