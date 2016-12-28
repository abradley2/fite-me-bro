# Contributing

### store.getState
Returns the current atom representing the store's state. One optional argument
(string), will cause it to return a certain slice of that state rather
than the entire app state.

### util.setupReducer
Very nice convenience function for making a reducer.
`setupReducer(..)` itself takes one (mandatory) argument, which is the 'slice'
of the app's state atom that it will be concerned with. It determines which
oldState is passed to it, and which it must return.

It is important to remember to call `create()` to return the initialized reducer
after `on` has been called for each action you wish to respond to.

### Built In actions
`types.__MOUNT__` is called automatically when the view is mounted. Use this
to set up a a views initial state if it has it's own reducer.

`types.__REMOVE__` is called automatically when a component is removed. Can be used
for cleanup if a component has created side-effects since mounting.

`types.__INIT__` is called automatically when the application is initialized. Use
this in application-level reducers to set up initial state.

### Basic Setup for Views
```
/** IMPORTS **/
const R = require('ramda')
const m = require('mithril')
const util = require('../util')
const store = require('../store')
const types = require('../types')

/** CONSTANTS **/
const SET_MESSAGE = 'Home.SET_MESSAGE'

/** REDUCER **/
const initialState = {
	message: 'Hello World'
}

const reducer = util.setupReducer('Home')
	.on(types.__MOUNT__, function () {
		return setHomeState(initialState)
	})
	.on(SET_MESSAGE, function (action, oldState) {
		const newState = R.set(
			R.lensProp('message'),
			action.message,
			oldState
		)

		return newState
	})

exports.reducer = reducer.create()

/** ACTION CREATORS **/
const setMessage = store.actionCreator(function (newMessage) {
	return {
		type: SET_MESSAGE,
		message: newMessage
	}
})

/** VIEW **/
function Home () {
	const appState = store.getState()
	const state = store.getState('Home')

	return m('div', [
		m('h3', state.message),
		m('input', {
			value: state.message,
			oninput: function (e) {
				setMessage(e.target.value)
			}
		})
	])
}

exports.view = {view: Home}
```

### Basic Setup for Reducers

### Basic Setup for Components


### Using State
Avoid local component state whenever possible. Almost no state should be too
trivial to be handled by a reducer. Use the utility-reducer "tempState" to keep track
of transient state like whether a dropdown is open or not, or whether a collapsible
panel is expanded or not.

### Developing
Hot module reload isn't needed here. Since all application state is in
a single immutable atom at any given time, while developing each
action persists state to local storage. `npm run dev` will spin up Budo,
and will reload on file changes. You state will be pre-populated from
local storage, which simulates all the effects of hot module reloading
without having to explicitly subscribe to anything :0

Of course, sometimes state that is saved isn't corrupted or erroring
out the application. In which case you need to empty out local storage.

In development mode the following commands are available on the window
object for some nice convenience dev-tool-commands
```
$debug.getState() // returns the current state of the application
$debug.dispatchAction({..}) // allows you to manually dispatch any action to the store
$debug.resetState() // reset the state of the application by dispatch an __INIT__ action
```

You can use `$debug.resetState()` to clear out local storage (and your state)
