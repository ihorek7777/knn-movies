const Koa = require('koa')
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger')
const MongoClient = require('mongodb').MongoClient

const app = new Koa()
const router = require('./server/router')

const port = process.env.PORT || 8080
const url = 'mongodb://localhost:27017'
const dbName = 'knn-movies'

app
	.use(bodyParser())
	.use(router.routes())
	.use(router.allowedMethods())
	.use(logger())

app.listen(port, () => {
	console.log('Server listening on port: ', port)
});

MongoClient.connect(url, function(err, client) {
	if (err) throw new Error('Fail to connect to the db server')

	console.log("Connected successfully to server");

	app.context.db = client.db(dbName);

	// client.close();
});
