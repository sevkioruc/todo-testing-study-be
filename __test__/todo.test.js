const app = require('../server')
const db = require('../database')

const supertest = require('supertest')
const request = supertest(app)

describe('Todo', () => {
	beforeEach(async () => {
		await db.todo.destroy({ truncate: true })
	})

	afterAll(done => {
		db.sequelize.close()
		done()
	})

	it('Todo list are taken', async () => {
		const response = await request.get('/v1/todo')

		expect(response.status).toBe(200)
	})

	it('If todo content is empty then return error message with status 400', async () => {
		const response =
			await request
				.post('/v1/todo')
				.send('')

		expect(response.body.message).toBe('Content can not be empty')
	})

	it('Return todo content when todo is created with status 201', async () => {
		const response =
			await request
				.post('/v1/todo')
				.send({ content: 'Dummy Content' })

		expect(response.body.content).toBe('Dummy Content')
	})

	it('Get specific todo with id', async () => {
		const todoCreateResponse =
			await request
				.post('/v1/todo')
				.send({ content: 'Specific todo content' })

		const todoID = todoCreateResponse.body.id

		const getSpecificTodoResponse = await request.get(`/v1/todo/${todoID}`)

		expect(getSpecificTodoResponse.body.content).toBe('Specific todo content')
	})

	it('Return not found error when get specific todo with invalid id', async () => {
		const todoCreateResponse =
			await request
				.post('/v1/todo')
				.send({ content: 'Specific todo content' })

		const getSpecificTodoResponse = await request.get('/v1/todo/2')

		expect(getSpecificTodoResponse.body.message).toBe('Todo not found')
	})

	it('Todo can be updated', async () => {
		const todoCreateResponse =
			await request
				.post('/v1/todo')
				.send({ content: 'Dummy content' })

		const todoID = todoCreateResponse.body.id

		await request
			.put(`/v1/todo/${todoID}`)
			.send({ content: 'Updated dummy content' })

		const getSpecificTodoResponse = await request.get(`/v1/todo/${todoID}`)

		expect(getSpecificTodoResponse.body.content).toBe('Updated dummy content')
	})

	it('Todo can be deleted', async () => {
		const todoCreateResponse =
			await request
				.post('/v1/todo')
				.send({ content: 'Dummy content' })

		const todoID = todoCreateResponse.body.id

		await request.delete(`/v1/todo/${todoID}`)

		const getAllTodoResponse = await request.get('/v1/todo')
		const allTodosLength = getAllTodoResponse.body.todos.length

		expect(allTodosLength).toBe(0)
	})
})
