const { port } = require('./config/config')
const express = require('express')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Database
const db = require('./database')
db.sequelize.sync()

const PORT = port || 5000
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
