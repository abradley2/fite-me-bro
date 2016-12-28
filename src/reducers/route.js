const m = require('mithril')
const types = require('../types')
const util = require('../util')

const route = util.setupReducer('route')
	.on(types.__INIT__, function () {
		return m.route.get() || '/'
	})
	.on(types.ROUTE, function (action) {
		m.route.set(action.route)

		return m.route.get()
	})

module.exports = route.create()
