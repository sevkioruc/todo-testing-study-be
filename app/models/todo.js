module.exports = (sequelize, Sequelize) => {
	const Todo = sequelize.define('todo', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		title: {
			type: Sequelize.STRING
		}
	})

	return Todo
}
