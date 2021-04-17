const route = require('express').Router()
const AdminController = require('../controllers/adminController')

route.post('/login', AdminController.loginAdmin)

route.post('/register', AdminController.registerAdmin)

route.post('/change', AdminController.changeAdmin)

module.exports = route
