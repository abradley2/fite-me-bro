const R = require('ramda')
const types = require('../types')
const setupReducer = require('melcore').setupReducer

const tempState = setupReducer('tempState')
	.on(types.__INIT__, function () {
		// clear temp state on app start
		return {}
	})
	.on(types.__MOUNT__, function () {
		// clear temp state whenever a view is mounted
		return {}
	})
	.on(types.SET_TEMP_STATE, function (action, oldState) {
		return R.set(
			R.lensProp(action.key),
			action.value,
			oldState
		)
	})
	.on(types.CLEAR_TEMP_STATE, function (action, oldState) {
		return R.omit(
			[action.key || Object.keys(oldState)],
			oldState
		)
	})

module.exports = tempState.create()
