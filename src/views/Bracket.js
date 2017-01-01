const m = require('mithril')
const setupReducer = require('melcore').setupReducer
const types = require('../types')
const Navigation = require('../components/Navigation').Navigation

/** CONSTANTS **/

/** REDUCER **/
const reducer = setupReducer('Bracket')
	.on(types.__MOUNT__, function () {
		return {}
	})

exports.reducer = reducer.create()
/** ACTION CREATOR **/

/** VIEW **/
function Bracket () {
	return m('div', [
		m(Navigation),
		m('h3', 'Bracket')
	])
}

exports.view = {view: Bracket}
