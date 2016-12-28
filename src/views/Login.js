const m = require('mithril')
const R = require('ramda')
const util = require('../util')
const store = require('../store')
const types = require('../types')
const Modal = require('../components/Modal').Modal
const TextInput = require('../components/TextInput').TextInput

/** CONSTANTS **/
const SET_USERNAME = 'Login.SET_USERNAME'
const SET_PASSWORD = 'Login.SET_PASSWORD'

/** REDUCER **/
const initialState = {
	username: '',
	password: ''
}

const reducer = util.setupReducer('Login')
	.on(types.__MOUNT__, function () {
		return initialState
	})
	.on(SET_USERNAME, function (action, oldState) {
		return R.set(
			R.lensProp('username'),
			action.username,
			oldState
		)
	})
	.on(SET_PASSWORD, function (action, oldState) {
		return R.set(
			R.lensProp('password'),
			action.password,
			oldState
		)
	})

exports.reducer = reducer.create()

/** ACTION CREATORS **/
const login = store.actionCreator(function () {
	return function (dispatch) {
		// simulate a request to a server sending in username and password,
		// if request is successful, login the user
		setTimeout(function () {
			dispatch({
				type: types.LOGIN_USER,
				userSessionId: 'thisIsTheId'
			})
			dispatch({
				type: types.ROUTE,
				route: '/'
			})
		}, 1000)
	}
})

const setUsername = store.actionCreator(function (username) {
	return {
		type: SET_USERNAME,
		username: username
	}
})

const setPassword = store.actionCreator(function (password) {
	return {
		type: SET_PASSWORD,
		password: password
	}
})

/** VIEW **/
function Login () {
	const state = store.getState('Login')

	return m('div', [

		m(Modal, {
			open: true
		}, [
			m(Modal.Header, [
				'Login'
			]),
			m(Modal.Body, [
				m('div', [
					m('label', 'Username: '),
					m('br'),
					m(TextInput, {
						value: state.username,
						oninput: function (e) {
							setUsername(e.target.value)
						}
					})
				]),
				m('div', [
					m('label', 'Password: '),
					m('br'),
					m(TextInput, {
						type: 'password',
						value: state.password,
						oninput: function (e) {
							setPassword(e.target.value)
						}
					})
				])
			]),
			m(Modal.Footer, [
				m('button.btn.btn-primary', {
					onclick: function () {
						login(state.username, state.password)
					}
				}, 'Login')
			])
		])
	])
}

exports.view = {view: Login}
