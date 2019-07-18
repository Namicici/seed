import Axios from 'axios'
import Util from 'util'

let serialNumber = {}

Axios.defaults.withCredentials = true
Axios.interceptors.request.use((config) => {
	return config
}, (error) => {
	console.log('拦截器 请求异常：', error)
	return Promise.reject({
		status: 0,
		statusText: 'REQUEST_ERROR'
	})
})

Axios.interceptors.response.use(function(rep) {
	if (rep && rep.data) {
		return rep.data
	} else {
		return Promise.reject({
			status: 0,
			statusText: 'RESPONSE_EMPTY'
		})
	}
}, function(err) {
	console.log('拦截器 返回异常：', err)
	return Promise.reject({
		status: 0,
		statusText: 'RESPONSE_ERROR'
	})
})

class CURD {
	constructor(baseURL, action) {
		this.timeout = 10000
		this.baseURL = baseURL || ''
		this.headers = {
			'X-Requested-With': 'XMLHttpRequest'
		}
		this.action = Util.extend({}, action)
		this.init()
	}
	init() {
		for (var x in this.action) {
			this[x] = function(type) {
				return function(params) {
					return this.send(params, type)
				}
			}(x)
		}
	}

	send(params, type) {
		let _params = Util.extend(true, {}, this.action[type], params)
		let _serial, _serialNumber = _params.serialNumber
		_params.headers = this.headers = {
			'X-Requested-With': 'XMLHttpRequest'
		}
		_params.timeout = _params.timeout || this.timeout

		return new Promise((resolve, reject) => {
			if (_params.method.toLowerCase() === 'get') {
				if (_params.url.indexOf('?') === -1) {
					_params.url += '?'
				}
				if (!_params.cache) {
					_params.url += 't=' + Math.random()
				}

				if (_params.data && !Util.isEmptyObject(_params.data)) {
					let arrUrl = []
					for (let i in _params.data) {
						// 兼容小窗最近使用字体接口
						if (!_params.noEncode) {
							arrUrl.push(i + '=' + encodeURIComponent(_params.data[i]))
						} else {
							arrUrl.push(i + '=' + _params.data[i])
						}
					}
					let str = arrUrl.length ? arrUrl.join('&') : ''
					let arrParams = _params.url.split('?')
					_params.url += arrParams[1] && str.length ? '&' + str : str
				}
			} else {
				if (_params.bJsonData) {
					_params.headers['Content-Type'] = 'application/json; charset=utf8'
					_params.data = JSON.stringify(_params.data)
					_params.bRawData = true
				} else {
					_params.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf8'
					if (Api.runtime !== 'browser') {
						let _search = []
						Object.entries(_params.data).forEach(keyofval => {
							if (!_params.noEncode) {
								_search.push(keyofval[0] + '=' + encodeURIComponent(keyofval[1]))
							} else {
								_search.push(keyofval[0] + '=' + keyofval[1])
							}
						})
						_params.data = _search.join('&')
					}
				}
			}
			if (_params.url.indexOf('?') === -1) {
				_params.url += '?'
			}
			let hasParams = _params.url.split('?')[1] != ''
			if (hasParams) {
				_params.url += '&'
			}
			_params.url += 'rmsp=' + encodeURIComponent(`pc_web`)
			if (_params.bJsonData) {
				_params.credentials = false
				delete _params.bJsonData
			} else {
				_params.credentials = true
			}

			var CancelToken = Axios.CancelToken
			var source = CancelToken.source()

			if (_serialNumber) {
				serialNumber[_serialNumber] && serialNumber[_serialNumber].cancel()
				serialNumber[_serialNumber] = source
				_serial = serialNumber[_serialNumber]
			}

			Axios({
				url: _params.url,
				method: _params.method,
				baseURL: this.baseURL,
				headers: this.headers,
				data: _params.data,
				params: _params.params,
				timeout: this.timeout,
				transformRequest: [function(d) {
					try {
						let param = Object.entries(d).map(item => {
							item[1] = item[1] && encodeURIComponent(item[1])
							return item.join('=')
						})
						d = param.join('&')
					} catch (e) {}
					return d
				}],
				cancelToken: source.token
			}).then(res => {
				if (_serialNumber) {
					//过滤相同的中间请求
					if (_serial != serialNumber[_serialNumber]) {
						return false
					}
				}
				resolve(res)
			}).catch(err => {
				if (_serialNumber) {
					//过滤相同的中间请求
					if (_serial != serialNumber[_serialNumber]) {
						return false
					}
				}
				reject(err)
			})
		})
	}
}

class DataService {
	constructor() {
		this.dataServices = []
	}
	add(name, baseURL, action) {
		this.dataServices[name] = new CURD(baseURL, action)
	}
	get(name) {
		return this.dataServices[name]
	}
}

export default DataService
