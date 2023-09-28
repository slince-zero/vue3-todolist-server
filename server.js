const express = require('express')
// 用于解析请求并创建req.body对象
const bodyParser = require('body-parser')
// 提供 express 中间件
const cors = require('cors')

const todoServe = require("./app/controllers/todo.controller")
// 处理跨域问题，任何前端都可以接入此后端
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200, // 状态码
}

const app = express()

app.use(cors(corsOptions))
// 解析 JSON 数据，返回 req.body
app.use(bodyParser.json())
// 解析 urlencoded 数据，返回 req.body，extended: false 表示使用 nodejs 内置的querystring来解析
app.use(bodyParser.urlencoded({ extended: true }))

// 简单路由
app.get('/', (req, res) => {
  todoServe.create(req, res);
  res.send('Hello World!')
})
app.get('/aa', (req, res) => {
  todoServe.create(req, res);
  res.send('Hello World!')
})


// 设置监听端口
app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000')
})

const db = require('./app/models/index.js')
db.sequelize.sync()
