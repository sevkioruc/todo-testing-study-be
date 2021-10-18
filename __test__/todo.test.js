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
})
