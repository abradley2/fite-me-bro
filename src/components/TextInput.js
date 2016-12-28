const m = require('mithril')

function TextInput (vnode) {
	return m('input.form-control', vnode.attrs)
}

exports.TextInput = {view: TextInput}
