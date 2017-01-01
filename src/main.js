const m = require('mithril')
const store = require('./store')
const types = require('./types')
const localforage = require('localforage')
const log = require('./util').log

// Views
const Home = require('./views/Home')
const Login = require('./views/Login')
const CreateBracket = require('./views/CreateBracket')
const Bracket = require('./views/Bracket')

const routes = {
	'/': createView(Home),
	'/login': createView(Login),
	'/brackets/create': createView(CreateBracket),
	'/brackets/view/:_id': createView(Bracket)
}

const actions = store.bindActionCreators({
	loadLocalState: function () {
		return function (dispatch) {
			localforage.getItem('__state__').then(function (data) {
				dispatch({
					type: types.LOAD_LOCAL_STATE,
					state: data
				})
				m.redraw()
			})
		}
	},
	resetState: function () {
		return function (dispatch) {
			dispatch({type: types.__INIT__})
			dispatch({type: types.__MOUNT__})
		}
	}
})

document.addEventListener('DOMContentLoaded', function () {
	const appContainer = document.createElement('div')
	document.body.appendChild(appContainer)

	m.route(appContainer, '/', routes)

	if (__env.dev) actions.loadLocalState()
})

function createView (component) {
	if (component.reducer) store.addViewReducer(component.reducer)

	return {
		oninit: function () {
			store.dispatch({
				type: types.__MOUNT__
			})
		},
		onremove: function () {
			store.dispatch({
				type: types.__REMOVE__
			})
		},
		view: function () {
			const mount = m(component.view)
			if (__env.test || __env.dev) window._vnode = mount
			return	mount
		}
	}
}

if (__env.test) {
	window.m = m
	window._vnode = null
	window.vnode = function () {
		return window._vnode
	}
}

if (__env.dev || __env.test) {
	window.$debug = {
		resetState: actions.resetState,
		dispatch: store.dispatch,
		getState: store.getState,
		types: types
	}
}
