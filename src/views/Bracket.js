const m = require('mithril')
const Navigation = require('../components/Navigation').Navigation

/** CONSTANTS **/

/** REDUCER **/

/** ACTION CREATOR **/

/** VIEW **/
function Bracket () {
	return m('div', [
		m(Navigation),
		m('h3', 'Bracket')
	])
}

exports.view = {view: Bracket}
