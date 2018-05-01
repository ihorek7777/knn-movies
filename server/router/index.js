const path = require('path')
const fs = require('fs')
const Router = require('koa-router')
const usersRouter = require('./users')

const router = new Router()

router.get('/', async ctx => {
	const file = fs.readFileSync(path.join(__dirname, '..', '..', 'build', 'index.html'))

	// console.log(readStream)
	// readStream.pipe(ctx.res)
	// ctx.response = file
})

router.use(usersRouter.routes())
router.use(usersRouter.allowedMethods())

module.exports = router
