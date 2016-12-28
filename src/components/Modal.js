const m = require('mithril')
const css = require('aphrodite').css
const StyleSheet = require('aphrodite').StyleSheet

const styles = StyleSheet.create({
	show: {
		display: 'block',
		opacity: 1
	},
	hide: {
		display: 'none'
	}
})

function Modal (vnode) {
	const attrs = vnode.attrs

	return m('div', [
		m('modal.fade.' + css(attrs.open && styles.show), [
			m('div.modal-dialog', [
				m('div.modal-content', attrs, vnode.children)
			])
		])
	])
}

function ModalHeader (vnode) {
	return m('div.modal-header', vnode.children)
}

function ModalBody (vnode) {
	return m('div.modal-body', vnode.children)
}

function ModalFooter (vnode) {
	return m('div.modal-footer', vnode.children)
}

exports.Modal = {view: Modal}
exports.Modal.Header = {view: ModalHeader}
exports.Modal.Body = {view: ModalBody}
exports.Modal.Footer = {view: ModalFooter}
