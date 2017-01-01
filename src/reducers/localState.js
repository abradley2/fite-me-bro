const R = require('ramda')
const localforage = require('localforage')
const types = require('../types')
const debounce = require('../util').debounce

const setLocalState = debounce(function set (state) {
	localforage.setItem('__state__', state)
}, 50)

function localState (action, oldState) {
	if (!__env.dev) return oldState

	// dont set local state on init, else budo reloading will always overwrite
	// the "hot state replacement" functionality
	if (action.type !== types.__INIT__) {
		setLocalState(oldState)
	}

	if (action.type === types.LOAD_LOCAL_STATE) {
		return R.merge(oldState, action.state)
	}

	return oldState
}

module.exports = localState
