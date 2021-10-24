module.exports = app => {
	const todoController = require('../controllers/todo.controller')

	const router = require('express').Router()

	router.get('/', todoController.findAll)

	router.get('/:id', todoController.findOne)

	router.post('/', todoController.create)

	app.use('/v1/todo', router)
}
