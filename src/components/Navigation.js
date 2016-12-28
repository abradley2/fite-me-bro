const m = require('mithril')
const StyleSheet = require('aphrodite').StyleSheet
const css = require('aphrodite').css
const Link = require('./Link').Link

const styles = StyleSheet.create({
	navWrap: {
		height: '45px',
		marginBottom: '5px',
		backgroundColor: 'white',
		textAlign: 'center',
		borderBottom: 'solid thin #d4d3d3'
	},
	navOption: {
		borderRadius: '4px',
		border: 'solid thin #337ab7'
	},
	navDisplay: {
		position: 'absolute',
		top: '0px',
		width: '100%',
		'@media (min-width: 600px)': {
			display: 'inline-block',
			position: 'relative'
		}
	},
	nav: {
		textAlign: 'center',
		width: '150px'
	},
	left: {
		top: '0px',
		left: '0px',
		position: 'absolute',
		'@media (min-width: 600px)': {
			position: 'relative'
		}
	},
	right: {
		top: '0px',
		right: '0px',
		position: 'absolute',
		'@media (min-width: 600px)': {
			position: 'relative'
		}
	},
	hiddenToggle: {}
})

function Navigation () {
	return m('div.' + css(styles.navWrap), [
		m('ul.nav.nav-pills.' + css(styles.navDisplay), [
			m('li.' + css(styles.left, styles.nav), [
				m(Link, {route: '/'}, [
					m('i.fa.fa-hand-rock-o'),
					'Fite Me Bro'
				])
			]),
			m('li.' + css(styles.right, styles.nav), [
				m(Link, {route: '/login'}, 'Login')
			])
		]),
		m('div.' + css(styles.hiddenToggle), [

		])
	])
}

exports.Navigation = {view: Navigation}
