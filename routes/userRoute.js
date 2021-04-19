const route = require('express').Router()
const UserController = require('../controllers/userController')
const { authorizeAdmin, authenticate } = require('../middlewares/auth')

route.post('/login', UserController.login)

route.post('/register', UserController.register)

route.use( authenticate, authorizeAdmin )

route.get('/', UserController.getUser)

route.delete('/:id', UserController.deleteUser)

module.exports = route
