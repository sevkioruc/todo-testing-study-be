module.exports = app => {
	const todoController = require('../controllers/todo.controller')

	const router = require('express').Router()

	router.get('/', todoController.findAll)

	app.use('/v1/todo', router)
}