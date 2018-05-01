const email = {
	type: 'string',
}

const username = {
	type: 'string'
}

const password = {
	type: 'string'
}

module.exports = {
	registerUserSchema: {
		email,
		username,
		password
	},
	userSchema: {
		email,
		password
	}
}
