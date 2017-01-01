const m = require('mithril')
const types = require('../types')
const setupReducer = require('melcore').setupReducer

const route = setupReducer('route')
	.on(types.__INIT__, function () {
		return m.route.get() || '/'
	})
	.on(types.ROUTE, function (action) {
		m.route.set(action.route)

		return m.route.get()
	})

module.exports = route.create()
