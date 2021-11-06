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

	it('If todo title is empty then return error message with status 400', async () => {
		const response =
			await request
				.post('/v1/todo')
				.send('')

		expect(response.body.message).toBe('Title can not be empty')
	})

	it('Return todo title when todo is created with status 201', async () => {
		const response =
			await request
				.post('/v1/todo')
				.send({ title: 'Dummy Title' })

		expect(response.body.title).toBe('Dummy Title')
	})

	it('Get specific todo with id', async () => {
		const todoCreateResponse =
			await request
				.post('/v1/todo')
				.send({ title: 'Specific todo title' })

		const todoID = todoCreateResponse.body.id

		const getSpecificTodoResponse = await request.get(`/v1/todo/${todoID}`)

		expect(getSpecificTodoResponse.body.title).toBe('Specific todo title')
	})

	it('Return not found error when get specific todo with invalid id', async () => {
		const todoCreateResponse =
			await request
				.post('/v1/todo')
				.send({ title: 'Specific todo title' })

		const getSpecificTodoResponse = await request.get('/v1/todo/2')

		expect(getSpecificTodoResponse.body.message).toBe('Todo not found')
	})

	it('Todo can be updated', async () => {
		const todoCreateResponse =
			await request
				.post('/v1/todo')
				.send({ title: 'Dummy title' })

		const todoID = todoCreateResponse.body.id

		await request
			.put(`/v1/todo/${todoID}`)
			.send({ title: 'Updated dummy title' })

		const getSpecificTodoResponse = await request.get(`/v1/todo/${todoID}`)

		expect(getSpecificTodoResponse.body.title).toBe('Updated dummy title')
	})

	it('Todo can be deleted', async () => {
		const todoCreateResponse =
			await request
				.post('/v1/todo')
				.send({ title: 'Dummy title' })

		const todoID = todoCreateResponse.body.id

		await request.delete(`/v1/todo/${todoID}`)

		const getAllTodoResponse = await request.get('/v1/todo')
		const allTodosLength = getAllTodoResponse.body.todos.length

		expect(allTodosLength).toBe(0)
	})
})
