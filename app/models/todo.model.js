module.exports = (sequelize, Sequelize) => {
  const Todo = sequelize.define('todo', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    age: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    address: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  })
  return Todo
}
