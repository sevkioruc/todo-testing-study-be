const db = require('../../database')
const Todo = db.todo

exports.findAll = async (req, res) => {
	const todos = await Todo.findAll()
	res.status(200).send(todos)
}

exports.create = async (req, res) => {
	if (!req.body.content) {
		res.status(400).send({ message: 'Content can not be empty' })
		return
	}

	try {
		const todo = { content: req.body.content }

		const response = await Todo.create(todo)
		res.status(201).send(response.dataValues)
	} catch {
		res.status(500).send({ message: 'Some error occured while creating the Todo' })
	}
}

exports.findOne = async (req, res) => {
	const id = req.params.id

	const todo = await Todo.findOne({ where: { id: id } })

	if (todo) {
		res.status(200).send(todo)
	} else {
		res.status(404).send({ message: 'Todo not found' })
	}
}

exports.update = async (req, res) => {
	const id = req.params.id
	try {
		await Todo.update({ content: req.body.content }, { where: { id: id } })
		res.status(200).send({ message: 'Todo was updated' })
	} catch {
		res.status(400).send({ message: 'Todo could not be update' })
	}
}
