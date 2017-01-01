const setupReducer = require('melcore').setupReducer
const types = require('../types')

const initialState = {
	loggedIn: true,
	userSessionId: null
}

const user = setupReducer('user')
	.on(types.__INIT__, function () {
		return initialState
	})
	.on(types.LOGIN_USER, function (action) {
		return {
			loggedIn: true,
			userSessionId: action.userSessionId
		}
	})

module.exports = user.create()
