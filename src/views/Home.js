const m = require('mithril')
const R = require('ramda')
const css = require('aphrodite').css
const StyleSheet = require('aphrodite').StyleSheet
const util = require('../util')
const types = require('../types')
const store = require('../store')
const Link = require('../components/Link').Link
const TextInput = require('../components/TextInput').TextInput

const styles = StyleSheet.create({
	wrapper: {
		textAlign: 'center',
		marginTop: '20%',
		'@media (min-width: 600px)': {
			marginTop: '15%'
		}
	},
	nav: {
		display: 'inline-block',
		maxWidth: '300px'
	},
	navOption: {
		borderRadius: '4px',
		border: 'solid thin #337ab7'
	}
})

/** CONSTANTS **/
const SET_SEARCH_VAL = 'HOME.SET_SEARCH_VAL'

/** REDUCER **/
const initialState = {
	searchVal: ''
}

const reducer = util.setupReducer('Home')
	.on(types.__MOUNT__, function () {
		return initialState
	})
	.on(SET_SEARCH_VAL, function (action, oldState) {
		const newState = R.set(
			R.lensProp('searchVal'),
			action.value,
			oldState
		)

		return newState
	})

exports.reducer = reducer.create()

/** ACTION CREATORS **/
const setSearchVal = store.actionCreator(function (value) {
	return {
		type: SET_SEARCH_VAL,
		value: value
	}
})

const resetEditBracket = store.actionCreator(function () {
	return {
		type: types.RESET_BRACKET_CONFIG
	}
})

const viewBracket = store.actionCreator(function (searchVal) {
	return {
		type: types.ROUTE,
		route: ('/brackets/view/' + searchVal),
		replace: false
	}
})

/** VIEW **/
function Home () {
	const state = store.getState('Home')

	return m('div.container.' + css(styles.wrapper), [
		m('h3', [
			m('i.fa.fa-hand-rock-o'),
			'Fite Me Bro'
		]),
		m('ul.nav.nav-pills.nav-stacked.' + css(styles.nav), [
			m('li.' + css(styles.navOption), [
				m(Link, {
					route: '/brackets/create',
					onroute: resetEditBracket,
				}, 'Create A Tournament')
			]),
			m('li.' + css(styles.navOption), [
				m('div.input-group', [
					m('span.input-group-btn', [
						m('button.btn.btn-primary', {
							onclick: function () {
								if (!state.searchVal) return
								viewBracket(state.searchVal)
							}
						}, 'View')
					]),
					m(TextInput, {
						placeholder: 'Enter bracket ID here',
						value: state.searchVal,
						oninput: function (e) {
							setSearchVal(e.target.value)
						}
					})
				])
			]),
			m('li.' + css(styles.navOption), [
				m(Link, {route: '/login'}, 'Login')
			])
		])
	])
}

exports.view = {view: Home}
