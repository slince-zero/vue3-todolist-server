// 这里是 Sequelize 的配置，用于连接数据库
module.exports = {
  HOST: 'localhost',
  USER: 'root',
  PASSWORD: '123456',
  DB: 'todolist',
  port: 3306,
  dialect: 'mysql',
  pool: {
    max: 5, // 最大连接数
    min: 0, // 最小连接数
    acquire: 30000, // 超时时间
    idle: 10000, // 空闲时间
  },
}
