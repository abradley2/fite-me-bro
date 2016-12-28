const m = require('mithril')
const R = require('ramda')
const StyleSheet = require('aphrodite').StyleSheet
const css = require('aphrodite').css

const Link = require('./Link').Link

const styles = StyleSheet.create({
	pointer: {cursor: 'pointer'}
})

const setAttrs = R.set(R.lensProp('attrs'))

// activeTab: index of the tab that is active
// onselect: fires when any tab is clicked. First arg is the index of the target
function Tabs (vnode) {
	const attrs = vnode.attrs
	const children = vnode.children

	const viewModel = R.pipe(
		R.merge(attrs)
	)({})

	return m('ul.nav.nav-tabs.' + css(attrs.styles), children.map(function (child, idx) {
		const childAttrs = R.merge({navIdx: idx, viewModel: viewModel}, child.attrs)

		return setAttrs(childAttrs, child)
	}))
}

function Nav (vnode) {
	const attrs = vnode.attrs
	const viewModel = attrs.viewModel
	const isActive = (attrs.navIdx === viewModel.activeTab)

	return m('li.' + (isActive ? '.active.' : '') + css(styles.pointer, attrs.styles), {
		onclick: function () {
			viewModel.onselect(attrs.navIdx)
		}
	}, [
		m(Link, {
			route: (attrs.route || false),
		}, vnode.children)
	])
}

exports.Tabs = {view: Tabs}
exports.Tabs.Nav = {view: Nav}
