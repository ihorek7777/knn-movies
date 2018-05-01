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

	const Users = ctx.db.collection('Users');

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

module.exports = usersRouter
