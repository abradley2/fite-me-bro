const m = require('mithril')
const StyleSheet = require('aphrodite').StyleSheet
const setupReducer = require('melcore').setupReducer
const store = require('../store')
const types = require('../types')
const Navigation = require('../components/Navigation').Navigation
const Toolbar = require('../components/Toolbar').Toolbar
const Dropdown = require('../components/Dropdown').Dropdown
const Panel = require('../components/Panel').Panel

/** STYLES **/
const styles = StyleSheet.create({
	centerText: {textAlign: 'center'}
})

/** CONSTANTS **/

/** REDUCER **/
const initialState = {

}

const reducer = setupReducer('CreateBracket')
	.on(types.__MOUNT__, function () {
		return initialState
	})

exports.reducer = reducer.create()

/** ACTION CREATORS **/
const setBracketType = store.actionCreator(function (bracketType) {
	return {
		type: types.SET_BRACKET_TYPE,
		bracketType: bracketType
	}
})

/** VIEW **/
function CreateBracket () {
	const state = store.getState('editBracket')

	return m('div', [
		m(Navigation),
		m(Toolbar, {
			options: [
				{
					icon: 'user',
					label: 'Add Participant',
					onclick: Function.prototype
				},
				{
					icon: 'user',
					label: 'Add Participant',
					onclick: Function.prototype
				},
				{
					icon: 'user',
					label: 'Add Participant',
					onclick: Function.prototype
				},
				{
					icon: 'user',
					label: 'Add Participant',
					onclick: Function.prototype
				},
				{
					icon: 'user',
					label: 'Add Participant',
					onclick: Function.prototype
				},
				{
					icon: 'user',
					label: 'Add Participant',
					onclick: Function.prototype
				},
				{
					icon: 'cloud',
					label: 'Save',
					onclick: Function.prototype,
					disabled: !state.hasChanges
				}
			]
		}),
		m('div.container', [
			m(Panel, {styles: [styles.centerText]}, [
				m(Panel.Heading, [
					m('h4', state.bracketName)
				])
			]),
			m(Dropdown, {
				id: 'bracket-type-dropdown',
				chooseText: 'type: ',
				selected: state.bracketType,
				onselect: function (val) {
					setBracketType(val)
				}
			}, [
				m(Dropdown.Option, {value: 1}, 'Single Elimination'),
				m(Dropdown.Option, {value: 2}, 'Double Elimination'),
				m(Dropdown.Option, {value: 3}, 'Round Robin')
			])

		])
	])
}

exports.view = {view: CreateBracket}
