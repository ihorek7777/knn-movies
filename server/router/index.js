const Router = require('koa-router')
const usersRouter = require('./users')

const router = new Router()

router.use(usersRouter.routes())
router.use(usersRouter.allowedMethods())

module.exports = router
