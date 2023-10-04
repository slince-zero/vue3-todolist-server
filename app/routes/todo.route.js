module.exports = (app) => {
  const todo = require('../controllers/todo.controller.js')
  const router = require('express').Router()

  // 创建并保存一条清单
  router.post('/', todo.create)

  // 从数据库中搜索所有
  router.get('/', todo.findAll)

  // 从数据库中搜索一条
  router.get('/:id', todo.findOne)

  // 删除一条清单
  router.delete('/:id', todo.delete)

  // 删除所有清单
  router.delete('/', todo.deleteAll)

  // 更新指定 ID 清单
  router.put('/:id', todo.update)

  app.use('/todo', router)
}
