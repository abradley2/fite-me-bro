const m = require('mithril')
const R = require('ramda')
const store = require('../store')
const types = require('../types')
const StyleSheet = require('aphrodite').StyleSheet
const css = require('aphrodite').css

const styles = StyleSheet.create({
	pointer: {
		cursor: 'pointer'
	}
})

const go = store.actionCreator(function (route, replace) {
	return {
		type: types.ROUTE,
		route: route,
		replace: replace
	}
})

function Link (vnode) {
	const attrs = vnode.attrs
	const children = vnode.children

	return m('a.' + css(styles.pointer, attrs.styles), R.merge(attrs, {
		href: ('#!' + attrs.route) || location.pathname,
		onclick: function (e) {
			e.preventDefault()

			if (attrs.onclick) attrs.onclick(e)

			if (!attrs.route) {
				return
			}

			if (attrs.onroute) attrs.onroute()

			go(attrs.route, (attrs.replaceState || false))
		}
	}), attrs.innerText || children)
}

exports.Link = {view: Link}
