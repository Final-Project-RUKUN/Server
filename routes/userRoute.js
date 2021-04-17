const route = require('express').Router()
const UserController = require('../controllers/userController')

route.post('/login', UserController.login)

route.post('/register', UserController.register)

route.get('/:id', UserController.getUser)

route.delete('/:id', UserController.deleteUser)

module.exports = route
