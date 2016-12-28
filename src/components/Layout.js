const m = require('mithril')

function Layout (vnode) {
	return m('div', {}, [
		vnode.children
	])
}

module.exports = {view: Layout}
