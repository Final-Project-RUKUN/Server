const route = require('express').Router()
const VillageController = require('../controllers/villageController')

route.get('/', VillageController.getDataVillage)

route.delete('/:id', VillageController.deleteVillage)


module.exports = route