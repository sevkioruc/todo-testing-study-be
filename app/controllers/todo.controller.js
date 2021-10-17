const db = require('../../database')
const Todo = db.todo

exports.findAll = async (req, res) => {
	const todos = await Todo.findAll()
	res.status(200).send(todos)
}

exports.create = async (req, res) => {
	if (!req.body.content) {
		res.status(400).send({ message: 'Content can not be empty' })
	}

	try {
		const todo = { content: req.body.content }

		const response = await Todo.create(todo)
		res.status(201).send(response.dataValues)
	} catch (err) {

	}
}
