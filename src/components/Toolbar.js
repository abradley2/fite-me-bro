const m = require('mithril')
const css = require('aphrodite').css
const StyleSheet = require('aphrodite').StyleSheet

const styles = StyleSheet.create({
	iconCircle: {
		fontSize: '18pt'
	},
	toolbarWrapper: {
		position: 'fixed',
		bottom: '0px'
	},
	toolbarBody: {
		height: '70px',
		overflowX: 'scroll',
		overflowY: 'hidden',
		whiteSpace: 'nowrap'
	},
	toolbarOption: {
		color: '#fff',
		marginRight: '5px',
		borderRadius: '4px',
		display: 'inline-block',
		textAlign: 'center',
		width: '100px',
		// should be overflowing on the bottom
		height: '80px',
		backgroundColor: '#337ab7',
		border: 'solid thin #337ab7',
		cursor: 'pointer',
		':hover': {
			backgroundColor: '#286090'
		}
	},
	optionDisabled: {
		backgroundColor: '#ddd',
		border: 'solid thin #ddd',
		cursor: 'not-allowed',
		':hover': {
			backgroundColor: '#ddd'
		}
	}
})

function Toolbar (vnode) {
	const options = vnode.attrs.options

	return m('div.' + css(styles.toolbarWrapper), [
		m('div.' + css(styles.toolbarBody), options.map(function (opt) {
			const optionStyles = css(
				styles.toolbarOption,
				(opt.disabled && styles.optionDisabled)
			)

			return m('div.' + optionStyles, {
				onclick: opt.onclick
			}, [
				m('i.' + css(styles.iconCircle) + '.fa.fa-' + opt.icon),
				m('br'),
				m('span.small', opt.label)
			])
		}))
	])
}

exports.Toolbar = {view: Toolbar}
