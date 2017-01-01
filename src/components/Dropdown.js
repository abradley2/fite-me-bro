const m = require('mithril')
const R = require('ramda')
const store = require('../store')
const types = require('../types')
const Link = require('./Link').Link
const StyleSheet = require('aphrodite').StyleSheet
const css = require('aphrodite').css

/** STYLES **/
const styles = StyleSheet.create({
	pointer: {
		cursor: 'pointer'
	}
})

/** ACTIONS **/
const toggleOpen = store.actionCreator(function (dropdownId, isOpen) {
	return {
		type: types.SET_TEMP_STATE,
		key: dropdownId + ':isOpen',
		value: isOpen
	}
})

/** VIEW **/

// selected: the value of the option that is selected
// onselect: function that triggers when an option with a value is selected
// chooseText?: small text displayed to the left of the label or select label
// dropdownLabel?: text on the button if there is no selected (or selectable) option
function Dropdown (vnode) {
	const tempState = store.getState('tempState')
	const attrs = vnode.attrs
	const isOpen = R.defaultTo(false, tempState[attrs.id + ':isOpen'])

	const dropdown = {
		onselect: attrs.onselect
	}

	// if the dropdown has something selected
	// the dropdownLabel is the selected option's label
	const selectedOption = R.find(
		function (child) {
			return (child.attrs.value === attrs.selected)
		},
		vnode.children
	)

	const dropdownLabel = getText(selectedOption) || ''

	return m('div.dropdown.' + (isOpen ? '.open' : ''), [
		m('button.btn.btn-primary.' + css(attrs.styles), {
			onclick: function (e) {
				// dropdowns are closed on any click on the body.
				// To prevent immediate re-close on clicking
				// the button to open, need to stop event propagation here
				e.stopPropagation()
				if (isOpen) {
					return toggleOpen(attrs.id, false)
				}
				return toggleOpen(attrs.id, true)
			}
		}, [
			(attrs.chooseText ? m('span.small', attrs.chooseText + ' ') : null),
			dropdownLabel || attrs.dropdownLabel,
			m('span.caret')
		]),
		m('ul.dropdown-menu', vnode.children.map(function (child) {
			return R.over(
				R.lensProp('attrs'),
				R.merge({dropdown: dropdown}),
				child
			)
		}))
	])
}

function Option (vnode) {
	const attrs = vnode.attrs
	const dropdown = attrs.dropdown

	return m('li.' + css(attrs.styles), [
		m(Link, {
			styles: styles.pointer,
			route: attrs.route || false,
			onclick: function () {
				if (attrs.value) {
					if (dropdown.onselect) dropdown.onselect(attrs.value)
				}
			}
		}, vnode.children)
	])
}

// utility function for getting the text
function getText (vnode) {
	if (!vnode) return null
	if (vnode.children) {
		if (Array.isArray(vnode.children)) return getText(vnode.children[0])

		return vnode.children
	}
}

exports.Dropdown = {
	oninit: function (vnode) {
		vnode.state.handleBodyClick = function (attrs) {
			const tempState = store.getState('tempState')
			if (tempState[attrs.id + ':isOpen']) {
				toggleOpen(attrs.id, false)
				m.redraw()
			}
		}

		vnode.state.onBodyClick = function () {
			vnode.state.handleBodyClick(vnode.attrs)
		}

		document.addEventListener('click', vnode.state.onBodyClick)
	},
	onremove: function (vnode) {
		document.removeEventListener('click', vnode.state.onBodyClick)
	},
	view: Dropdown
}
exports.Dropdown.Option = {view: Option}
