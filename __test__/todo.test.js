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

})
