const createStore = require('melcore').createStore

const viewReducers = []

const store = createStore([
	views,
	require('./reducers/route'),
	require('./reducers/tempState'),
	require('./reducers/user'),
	require('./reducers/editBracket'),
	require('./reducers/localState')
])

store.addViewReducer = function (reducer) {
	if (viewReducers.indexOf(reducer) === -1) viewReducers.push(reducer)
}

function views (action, oldState) {
	return viewReducers.reduce(function (state, reduceFunc) {
		return (function (res) {
			return res === state ? res : res(state)
		})(reduceFunc(action, state))
	}, oldState)
}

module.exports = store
