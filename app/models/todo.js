module.exports = (sequelize, Sequelize) => {
	const Todo = sequelize.define('todo', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		content: {
			type: Sequelize.STRING
		}
	})

	return Todo
}
