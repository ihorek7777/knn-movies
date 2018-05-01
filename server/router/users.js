const Router = require('koa-router')

const usersRouter = new Router({
	prefix: '/users',
})

usersRouter.post('/register', async ctx => {
	const { email, password, username } = ctx.request.body

	if (!email || !password || !username) {
		return ctx.throw(421, 'Not valid data for register user')
	}

	// console.log(ctx.request.body)
	// console.log(ctx.db)

	const Users = ctx.db.collection('Users')

	const isUserAlreadyExist = await Users.findOne({ email })

	if (isUserAlreadyExist) {
		console.log(isUserAlreadyExist)
		return ctx.throw(400, 'User already exist')
	}

	const result = await Users.insert({ email, password, username })

	ctx.response.status = 200
	ctx.body = result

	console.log('User registered', email)
})

usersRouter.post('/login', async ctx => {
	const { email, password } = ctx.request.body

	if (!email || !password) {
		return ctx.throw(421, 'Not valid data for register user')
	}

	const Users = ctx.db.collection('Users')

	const isUserExist = await Users.findOne({ email })

	if (!isUserExist) {
		return ctx.throw(404, 'User not found')
	}

	if (isUserExist.password !== password) {
		return ctx.throw(400, 'Not valid password')
	}

	ctx.response.status = 200
	ctx.body = isUserExist

	console.log('User logged')
})

module.exports = usersRouter
