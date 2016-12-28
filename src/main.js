const m = require('mithril')
const store = require('./store')
const types = require('./types')
const log = require('./util').log
const localforage = require('localforage')

// Views
const Home = require('./views/Home')
const Login = require('./views/Login')
const CreateBracket = require('./views/CreateBracket')
const Bracket = require('./views/Bracket')

document.addEventListener('DOMContentLoaded', function () {
	function startApp () {
		const appContainer = document.createElement('div')
		document.body.appendChild(appContainer)

		m.route(appContainer, '/', {
			'/': createView(Home),
			'/login': createView(Login),
			'/brackets/create': createView(CreateBracket),
			'/brackets/view/:_id': createView(Bracket)
		})
	}
	store.dispatchAction({
		type: types.__INIT__
	})
	startApp()

	if (__env.dev) {
		localforage.getItem('__state__', function (err, val) {
			if (err) return
			if (val) {
				log('local state loaded: ', val)
				store.__setState(val)
			}
		})
	}
})

function createView (component) {
	if (component.reducer) store.registerReducer(component.reducer)

	return {
		oninit: function () {
			store.dispatchAction({
				type: types.__MOUNT__
			})
		},
		onremove: function () {
			store.dispatchAction({
				type: types.__REMOVE__
			})
		},
		view: function (mountedNode) {
			if (__env.test || __env.dev) window._vnode = mountedNode
			return m('div', {}, m(component.view))
		}
	}
}

// when out of prod, put mithril on the window, and a getter/setter function
// for the currently mounted vnode to facilitate testing
if (__env.test || __env.dev) {
	window.m = m
	window._vnode = null
	window.vnode = function () {
		return window._vnode
	}
}

// for quick console debugging
if (__env.dev || __env.test) {
	window.$debug = {
		resetState: store.resetState,
		dispatchAction: store.dispatchAction,
		getState: store.getState,
		types: types
	}
}

// fucking IE
if (typeof Object.assign !== 'function') {
	Object.assign = function (target, varArgs) { // .length of function is 2
		if (target === null || varArgs === null) { // TypeError if undefined or null
			throw new TypeError('Cannot convert undefined or null to object')
		}

		var to = Object(target)

		for (var index = 1; index < arguments.length; index++) {
			var nextSource = arguments[index]

			if (nextSource !== null) { // Skip over if undefined or null
				for (var nextKey in nextSource) {
					// Avoid bugs when hasOwnProperty is shadowed
					if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
						to[nextKey] = nextSource[nextKey]
					}
				}
			}
		}
		return to
	}
}
