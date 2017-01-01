const R = require('ramda')
const uid = require('shortid').generate
const types = require('../types')
const setupReducer = require('melcore').setupReducer

const initialState = {
	bracketId: uid(),
	bracketName: 'New Bracket',
	bracketType: types.SINGLE_ELIMINATION,
	hasChanges: false,
	participants: []
}

const reducer = setupReducer('editBracket')
	.on(types.__INIT__, function () {
		return initialState
	})
	.on(types.RESET_BRACKET_CONFIG, function () {
		return initialState
	})
	.on(types.SET_BRACKET_TYPE, function (action, oldState) {
		return R.merge(oldState, {
			hasChanges: true,
			bracketType: action.bracketType
		})
	})
	.on(types.ADD_PARTICIPANT, function (action, oldState) {
		const participants = R.append(
			R.set(R.lensProp('_id', uid(), action.participant)),
			oldState.participants
		)

		return R.merge(oldState, {
			hasChanges: true,
			participants: participants
		})
	})
	.on(types.REMOVE_PARTICIPANT, function (action, oldState) {
		const participants = R.filter(
			function (p) {
				return p._id !== action.id
			},
			oldState.participants
		)

		return R.merge(oldState, {
			hasChanges: true,
			participants: participants
		})
	})
	.on(types.EDIT_PARTICIPANT, function (action, oldState) {
		const targetIdx = R.findIndex(R.propEq('_id', action.id), oldState.participants)
		const editParticpant = R .set(R.lensProp(action.property), action.value)

		const participants = R.adjust(
			targetIdx,
			editParticpant,
			oldState.participants
		)

		return R.merge(oldState, {
			hasChanges: true,
			participants: participants
		})
	})

module.exports = reducer.create()
