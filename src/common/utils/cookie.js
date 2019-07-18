// var getCookieVal = function(offset) {
// 	var endstr = document.cookie.indexOf("", offset)
// 	if (endstr == -1) {
// 		endstr = document.cookie.length
// 	}
// 	return decodeURIComponent(document.cookie.substring(offset, endstr))
// }
/* set Cookies */
var set = function(name, value) {
	var argv = arguments
	var argc = arguments.length
	var expires = (argc > 2) ? argv[2] : null
	var path = (argc > 3) ? argv[3] : '/'
	var domain = (argc > 4) ? argv[4] : null
	var secure = (argc > 5) ? argv[5] : false
	document.cookie = name + "=" + encodeURIComponent(value) +
		((expires === null) ? "" : (" ;expires=" + expires.toGMTString())) +
		((path === null) ? "" : (" ;path=" + path)) +
		((domain === null) ? "" : (" ;domain=" + domain)) +
		((secure !== false) ? " ;secure" : "")
}

/* read Cookies*/
var get = function(name) {
	var arr = document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'))
	return arr ? decodeURI(arr[2]) : null
}

/* clear Cookies*/
var clear = function(name) {
	if (get(name)) {
		var expdate = new Date()
		expdate.setTime(expdate.getTime() - (86400 * 1000 * 1))
		set(name, "", expdate)
	}
}


export default {
	set: set,
	get: get,
	clear: clear
}
