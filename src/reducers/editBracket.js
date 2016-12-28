const R = require('ramda')
const uid = require('shortid').generate
const types = require('../types')
const util = require('../util')

const initialState = {
	bracketId: uid(),
	bracketName: 'New Bracket',
	bracketType: types.SINGLE_ELIMINATION,
	hasChanges: false,
	participants: []
}

const setHasChanges = R.set(R.lensProp('hasChanges'), true)

const reducer = util.setupReducer('editBracket')
	.on(types.__INIT__, function () {
		return initialState
	})
	.on(types.RESET_BRACKET_CONFIG, function () {
		return initialState
	})
	.on(types.SET_BRACKET_TYPE, function (action, oldState) {
		return R.pipe(
			R.set(
				R.lensProp('bracketType'),
				action.bracketType
			),
			setHasChanges
		)(oldState)
	})
	.on(types.ADD_PARTICIPANT, function (action, oldState) {
		const participants = R.append(
			R.set(R.lensProp('_id', uid(), action.participant)),
			oldState.participants
		)

		return R.pipe(
			R.set(
				R.lensProp('participants'),
				participants
			),
			setHasChanges
		)(oldState)
	})
	.on(types.REMOVE_PARTICIPANT, function (action, oldState) {
		const participants = R.filter(
			function (p) {
				return p._id !== action.id
			},
			oldState.participants
		)

		return R.pipe(
			R.set(
				R.lensProp('participants'),
				participants
			),
			setHasChanges
		)(oldState)
	})
	.on(types.EDIT_PARTICIPANT, function (action, oldState) {
		const particpantIdx = R.findIndex(R.propEq('_id', action.id), oldState.participants)
		const editParticpant = R .set(R.lensProp(action.property), action.value)

		const participants = R.adjust(
			particpantIdx,
			editParticpant,
			oldState.participants
		)

		return R.pipe(
			R.set(
				R.lensProp('participants'),
				participants
			),
			setHasChanges
		)(oldState)
	})

module.exports = reducer.create()
