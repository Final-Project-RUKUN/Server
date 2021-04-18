const { Village, User } = require('../models/')
class VillageController { 

  static async getDataVillage(req, res, next) {
    const { VillageId } = req.currentUser
    try {
      
      const data = await Village.findByPk(VillageId, { include: User })

      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }

  static async deleteVillage(req, res, next) {
    const { VillageId } = req.currentUser
    try {
      await Village.destroy({ where : { id: VillageId }})

      res.status(200).json({ message: "Success Delete Village" })
    } catch (error) {
      next(error)
    }
  }

}

module.exports = VillageController
