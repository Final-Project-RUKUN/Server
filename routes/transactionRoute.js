const route = require('express').Router()
const TransactionController = require('../controllers/transactionController') 

route.get('/', TransactionController.fetchTransaction)

route.post('/add', TransactionController.addTransaction)

module.exports = route
