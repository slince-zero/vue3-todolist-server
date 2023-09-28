// 初始化 sequelize

const dbConfig = require('../config/db.config')
const Sequelize = require('sequelize')
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
})
const db = {}

db.Sequelize = Sequelize // 将 Sequelize 库的引用赋值给 db.Sequelize，这样其他模块就可以通过 db.Sequelize 访问
db.sequelize = sequelize // 将数据模型的 Sequelize 实例赋值给

db.todo = require('./todo.model.js')(sequelize, Sequelize)

module.exports = db
