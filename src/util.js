const R = require('ramda')

exports.setupReducer = function setupReducer (slice, handlers) {
	return {
		on: function on (actionType, handler) {
			if (!actionType) throw new TypeError('actionType must be valid')
			return setupReducer(
				slice,
				R.set(
					R.lensProp(actionType),
					handler,
					(handlers || {})
				)
			)
		},
		create: function create () {
			return function (action, oldState) {
				let retVal
				const setState = R.set(R.lensProp(slice))
				if (handlers && handlers[action.type]) {
					retVal = handlers[action.type](action, oldState[slice])
				} else {
					retVal = oldState[slice] || {}
				}
				if (!retVal) {
					throw new Error('Reducer for ' + slice + ' returned invalid state')
				}
				return setState(retVal)
			}
		}
	}
}

// fucking with eslint :)
exports.log = function log () {
	const _console_ = 'console'
	if (__env === 'prod') return
	if (!window[_console_]) return
	window[_console_].log.apply(window[_console_], arguments)
}

exports.error = function err () {
	const _console_ = 'console'
	if (!window[_console_]) return
	window[_console_].error.apply(window[_console_], arguments)
}

// underscore.js <3
exports.debounce = function (func, wait, immediate) {
	let timeout
	return function () {
		let self = this
		let args = arguments
		function later () {
			timeout = null
			if (!immediate) func.apply(self, args)
		}
		let callNow = immediate && !timeout
		clearTimeout(timeout)
		timeout = setTimeout(later, wait)
		if (callNow) func.apply(self, args)
	}
}
