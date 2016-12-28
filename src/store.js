const stream = require('mithril/stream')
const m = require('mithril')
const R = require('ramda')
const forage = require('localforage')
const log = require('./util').log
const debounce = require('./util').debounce
const types = require('./types')

const reducers = [
	require('./reducers/route'),
	require('./reducers/tempState'),
	require('./reducers/user'),
	require('./reducers/editBracket')
]

const store = stream({})

function getState (slice) {
	if (slice) return store()[slice]
	return store()
}

const storeLocalState = debounce(function (newState) {
	forage.setItem('__state__', newState)
}, 100)

function getLocalState () {
	return forage.getItem('__state__')
}

function resetState () {
	return dispatchAction(function (dispatch) {
		dispatch({
			type: types.__INIT__,
			resetLocalState: true,
		})
		dispatch({
			type: types.__MOUNT__,
			resetLocalState: true
		})
		m.redraw()
	})
}

function dispatchAction (action) {
	if (!action) throw new TypeError('did not dispatch valid action')

	if (action.constructor === Function) return action(dispatchAction)

	if (!action.type) throw new TypeError('must specify action.type')

	log('ACTION: ', action)

	store(R.reduce(
		function (currentState, reduceFunc) {
			const result = reduceFunc(action, currentState)

			if (typeof result === 'undefined' || result === null) {
				throw new TypeError('reducers may not return null or undefined')
			}

			if (result.constructor === Function) {
				return result(currentState)
			}

			return result
		},
		store(),
		reducers
	))

	// don't store local state on init and mount
	if (
		__env.dev &&
		action.type !== types.__INIT__ &&
		action.type !== types.__MOUNT__
	) {
		storeLocalState(store())
	} else if (action.resetLocalState) {
		storeLocalState(store())
	}
}

// utility for having a function automatically
// sending its result to dispatchAction
function actionCreator (func) {
	return (function (origFunc) {
		return function () {
			dispatchAction(origFunc.apply({}, arguments))
		}
	})(func)
}

function registerReducer (reducer) {
	reducers.push(reducer)
}

// internal use only!
function __setState (state) {
	store(state)
	m.redraw()
}

module.exports = {
	registerReducer,
	resetState: resetState,
	getLocalState: getLocalState,
	dispatchAction: dispatchAction,
	actionCreator: actionCreator,
	getState: getState,
	__setState: __setState
}
