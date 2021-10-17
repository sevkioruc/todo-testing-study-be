const { dbName, username, password, host, dialect } = require('./config/config')

const Sequelize = require('sequelize')
const sequelize = new Sequelize(dbName, username, password, {
	host,
	dialect,
	logging: false
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.todo = require('./app/models/todo')(sequelize, Sequelize)

module.exports = db
