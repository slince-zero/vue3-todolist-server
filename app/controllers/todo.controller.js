// 将 sequelize 写入控制器来操作数据
const db = require('../models/index.js')
const Todo = db.todo
const Op = db.Sequelize.Op

// 创建并保存一条清单
exports.create = (req, res) => {
  console.log("11");
  if (!req.body.name) {
    res.status(400).send({
      message: 'Content can not be empty!',
    })
    return
  }

  // 创建一条清单
  const todo = {
    name: req.body.name,
    age: req.body.age,
    address: req.body.address,
  }

  // 保存到数据库
  Todo.create(todo)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Todo.',
      })
    })
}

// 从数据库中搜索所有
exports.findAll = (req, res) => {
  const name = req.query.name
  const condition = name ? { name: { [Op.like]: `%${name}%` } } : null

  Todo.findAll({ where: condition })
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving todos.',
      })
    })
}

// 从数据库中搜索一条
exports.findOne = (req, res) => {
  const id = req.params.id
  Todo.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).send({
          message: `Cannot find Todo with id=${id}.`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving Todo with id=' + id,
      })
    })
}

// 更新指定 ID 清单
exports.update = (req, res) => {
  const id = req.params.id
  Todo.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Todo was updated successfully.',
        })
      } else {
        res.send({
          message: `Cannot update Todo with id=${id}. Maybe Todo was not found or req.body is empty!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Todo with id=' + id,
      })
    })
}

// 删除一条清单
exports.delete = (req, res) => {
  const id = req.params.id
  Todo.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Todo was deleted successfully!',
        })
      } else {
        res.send({
          message: `Cannot delete Todo with id=${id}. Maybe Todo was not found!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Todo with id=' + id,
      })
    })
}

// 删除所有清单
exports.deleteAll = (req, res) => {
  Todo.destroy({
    where: {},
    truncate: false, // 表示删除操作不会将数据库表截断（清空表）
  })
    .then((nums) => {
      res.send({ message: `${nums} Todos were deleted successfully!` })
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while removing all todos.',
      })
    })
}
