const through = require('through2')

// Simple utility to add "env" variables to bundles via arguments from browserify
//
// "-t [./env --dev --hello]"
// will add
// const __env = {};__env.dev = true;__env.hello = true
// to the top of all bundles
//
// you can also set the value of specific env flags
// "-t [./env --message 'Hello World']"
// will add
// const __env = {};__env.message = 'Hello World';
// to the top of every bundle
function env (file, cfg) {
	const envVars = Object.keys(cfg).reduce(function (acc, cur) {
		if (typeof cfg[cur] === 'object') {
			return acc
		}

		if (typeof cfg[cur] === 'string') {
			return `${acc}__env.${cur} = "${cfg[cur]}";`
		}

		if (typeof cfg[cur] === 'number' || typeof cfg[cur] === 'boolean') {
			return `${acc}__env.${cur} = ${cfg[cur]};`
		}

		return `${acc}__env.${cur} = true;`
	}, 'const __env = {};')

	return through(function (chunk, enc, next) {
		this.push(envVars + chunk.toString('utf8'))
		next()
	})
}

module.exports = env
