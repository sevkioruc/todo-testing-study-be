const dotenv = require('dotenv')
dotenv.config()

module.exports = {
	port: process.env.PORT,
	dbName: process.env.DB_NAME,
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	host: process.env.HOST,
	dialect: process.env.DIALECT
}
