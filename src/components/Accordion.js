const m = require('mithril')
const R = require('ramda')
const css = require('aphrodite').css
const StyleSheet = require('aphrodite').StyleSheet

const setAttrs = R.set(R.lensProp('attrs'))

const styles = StyleSheet.create({
	group: {},
	heading: {
		cursor: 'pointer'
	},
	content: {
		transition: '0.5s',
		maxHeight: '0px',
		overflow: 'hidden'
	},
	contentActive: {
		maxHeight: '400px',
		overflowY: 'scroll',
		transition: '1s'
	}
})

// activePanel: the index of the panel that is activePanel
// onselect: callback fired whenever a panel header is clicked, first arg
// is index of the panel clicked
function Accordion (vnode) {
	const attrs = vnode.attrs
	const children = vnode.children
	const accordionCss = css(styles.group, attrs.styles)

	return m('.panel-group.' + accordionCss, children.map(function (child, idx) {
		const childAttrs = R.merge({
			panelIdx: idx,
			inGroup: true
		}, child.attrs)

		return setAttrs(childAttrs, child)
	}))
}

function Panel (vnode) {
	const attrs = vnode.attrs
	const children = vnode.children

	const viewModel = R.pipe(
		R.merge(attrs),
		R.merge({
			panelIdx: attrs.panelIdx
		})
	)({})

	return m('.panel.panel-default.' + css(styles.group), children.map(function (child) {
		const childAttrs = R.merge({viewModel: viewModel}, child.attrs)

		return setAttrs(childAttrs, child)
	}))
}

function Heading (vnode) {
	const attrs = vnode.attrs
	const viewModel = attrs.viewModel
	const isOpen = (viewModel.activePanel === viewModel.panelIdx)

	return m('div.panel-heading.' + css(styles.heading, attrs.styles), {
		onclick: function () {
			const selected = isOpen ? null : viewModel.panelIdx
			viewModel.onselect(selected)
		}
	}, vnode.children)
}

function Content (vnode) {
	const attrs = vnode.attrs
	const viewModel = attrs.viewModel
	const isOpen = (viewModel.panelIdx === viewModel.activePanel)
	const contentStyles = css(
		styles.content,
		attrs.styles,
		(isOpen && styles.contentActive)
	)

	return m('div.panel-collapse.' + contentStyles, [
		m('div.panel-body', vnode.children)
	])
}

exports.Accordion = {view: Accordion}
exports.Accordion.Panel = {view: Panel}
exports.Accordion.Heading = {view: Heading}
exports.Accordion.Content = {view: Content}
