# Architecture

### Build Process

Just npm install. The only thing "needed" globally is Budo for the preferred dev
server.

### Basic Setup for Views

Views generally have 5 things

`STYLES`, `CONSTANTS`, `REDUCER`, `ACTION` `CREATORS`, `VIEW`

Here is an example of a very basic view divided into all of these:

```
const R = require('ramda')
const m = require('mithril')
const StyleSheet = require('aphrodite').StyleSheet
const css = require('aphrodite').css
const setupReducer = require('melcore').setupReducer
const store = require('../store')
const types = require('../types')

/** STYLES **/
const styles = StyleSheet.create({
	somePadding: {
		padding: '15px'
	}
})

/** CONSTANTS **/
const SET_MESSAGE = 'Home.SET_MESSAGE'

/** REDUCER **/
const reducer = setupReducer('Home')
	.on(types.__MOUNT__, function () {
		return {
			message: 'Hello World'
		}
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
const setMessage = store.bindActionCreator(function (newMessage) {
	return {
		type: SET_MESSAGE,
		message: newMessage
	}
})

/** VIEW **/
function Home () {
	const appState = store.getState()
	const state = store.getState('Home')

	return m('div.' + css(somePadding), [
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

A `types.__MOUNT__` action is filed every time a new view is mounted. This is
used by the view's reducer to set up it's initial state.

### Using State
Avoid local component state whenever possible. Almost no state should be too
trivial to be handled by a reducer. Use the utility-reducer "tempState" to keep track
of transient state like whether a dropdown is open or not, or whether a collapsible
panel is expanded or not.

### Developing
Hot module reload isn't needed here. Since all application state is in
a single immutable atom at any given time, while developing each
action persists state to local storage. `npm run dev-server` will spin up Budo,
and will reload on file changes.

Of course, sometimes state that is saved is screwing up the application.

In development mode the following commands are available on the window
object for some nice convenience dev-tool-commands
```
$debug.getState() // returns the current state of the application
$debug.dispatchAction({..}) // allows you to manually dispatch any action to the store
$debug.resetState() // reset the state of the application by dispatch an __INIT__ action
```

You can use `$debug.resetState()` to clear out local storage (and your state)
