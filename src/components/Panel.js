const m = require('mithril')
const css = require('aphrodite').css

function Panel (vnode) {
	const attrs = vnode.attrs

	return m('div.panel.panel-default.' + css(attrs.styles), vnode.children)
}

function Heading (vnode) {
	const attrs = vnode.attrs

	return m('div.panel-heading' + css(attrs.styles), vnode.children)
}

function Body (vnode) {
	const attrs = vnode.attrs

	return m('div.panel-body.' + css(attrs.styles), vnode.children)
}

function Footer (vnode) {
	const attrs = vnode.attrs

	return m('div.panel-footer.' + css(attrs.styles), vnode.children)
}

exports.Panel = {view: Panel}
exports.Panel.Heading = {view: Heading}
exports.Panel.Body = {view: Body}
exports.Panel.Footer = {view: Footer}
