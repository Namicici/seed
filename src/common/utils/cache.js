import ClientApi from 'clientApi'
/**
 * [数据缓存类]
 * 
 */

//当前运行环境
var runtime = ClientApi.isWpsEnv ? ClientApi.runtime : 'browser'

function serialize(val) {
	if (typeof val === 'string') { return val }
	return JSON.stringify(val)
}

function deserialize(val) {
	if (typeof val !== 'string') {
		return undefined
	}
	try {
		return JSON.parse(val)
	} catch (e) {
		return val || undefined
	}
}

var setLocalCache = function(name, value) {
	value = JSON.stringify(value)
	window.localStorage.setItem(name, value)
}
var getLocalCache = function(name) {
	let json = null
	try {
		json = JSON.parse(window.localStorage.getItem(name))
	} catch (e) {}
	return json
}
var clearLocalCache = function(name) {
	window.localStorage.removeItem(name)
}

var setSessionCache = function(name, value) {
	value = JSON.stringify(value)
	window.sessionStorage.setItem(name, value)
}

var getSessionCache = function(name) {
	let json = null
	try {
		json = JSON.parse(window.sessionStorage.getItem(name))
	} catch (e) {}
	return json
}

var removeCache = function(key) {
	if (runtime === 'browser') {
		clearLocalCache(key)
		return
	}
	ClientApi.localStorageRemove(key)
}

var setCache = function(key, value, stamp) {
	if (!value) {
		removeCache(key)
		return
	}
	value = serialize(value)
	if (runtime != 'browser') {
		console.log(`set cache ${key} ${stamp} `, value)
		ClientApi.localStorageSet(key, value, Date.now() + stamp)
		return
	}
	// setLocalCache(key, value, stamp)
}

var setDataCache = function(key, res) {
	if (res && res.result == 'ok' && res.data) {
		setCache(key, res)
	}
}

var getCache = function(key) {
	return new Promise((resolve) => {
		if (runtime != 'browser') {
			ClientApi.localStorageGet(key).then(function(cacheData) {
				console.log(`get cache ${key} `, cacheData)
				if (cacheData === undefined || cacheData === null || !cacheData.value) {
					resolve({value: null, expire: true})
				} else {
					let value = {}
					let expire = true
					try {
						value = deserialize(cacheData.value)
						expire = cacheData.stamp ? Number(cacheData.stamp) < Date.now() : false
					} catch (e) {}
					resolve({value, expire})
				}
			}).catch(() => {
				resolve({value: null, expire: true})
			})
			return
		}
		let value = getLocalCache(key)
		if (value === undefined || value === null || !value) {
			resolve({value: null, expire: true})
			return 
		}
		value = deserialize(value)
		resolve({value, expire: value.stamp ? Number(value.stamp) < Date.now() : false})
	})
}

var remoteCallFn = function(key, remoteCall, resolve, reject) {
	remoteCall().then(function(resp) {
		resolve(resp)
		if (runtime !== 'browser') {
			setDataCache(key, resp)
		}
	}).catch(err => {
		reject(err)
	})
}

//此处统一使用客户端接口，在关闭应用后写缓存到数据库；
var bind = function(cacheKey, remoteCall) {

	return new Promise((resolve, reject) => {
		//浏览器不缓存
		if (runtime === 'browser') {
			remoteCallFn(cacheKey, remoteCall, resolve, reject)
		} else {
			ClientApi.localStorageGet(cacheKey).then(function(cacheData) {
				if (cacheData === undefined || cacheData === null || !cacheData.value || new Date().getTime() - cacheData.stamp > 15 * 60 * 1000) {
					remoteCallFn(cacheKey, remoteCall, resolve, reject)
				} else {
					let json = {}
					try {
						json = JSON.parse(cacheData.value)
					} catch (e) {}
					resolve(json)
				}
			}).catch(() => {
				remoteCallFn(cacheKey, remoteCall, resolve, reject)
			})
		}
	})
}

export default {
	setLocalCache,
	getLocalCache,
	setSessionCache,
	getSessionCache,
	clearLocalCache,
	bind,
	get: getCache,
	set: setCache
}