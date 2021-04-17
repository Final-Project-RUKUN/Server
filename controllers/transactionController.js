const { Transaction, Village, User } = require('../models')

class TransactionController { 

  static async fetchTransaction(req, res, next) {
    try {
      const { VillageId } = req.currentUser

      const village = await Village.findByPk(VillageId, { include: [{
        model:  Transaction,
        include: User }]
      })
      
      res.status(200).json(village)
    } catch (error) {
      next(error)
    }
  }

  static async addTransaction(req, res, next) {
    const { title, amount, category, note, type } = req.body
    const { id, VillageId } = req.currentUser
    
    try {
      if (type === 'expence') {
        const { balance } = await Village.findByPk(VillageId)
        const newBalance = balance - +amount

        await Village.update({ balance: newBalance }, { where: { id: VillageId }})

        const dataCreate = await Transaction.create({ title, amount, category, note, type, VillageId, UserId: id })    
        res.status(201).json(dataCreate)
      } else {
        const { balance } = await Village.findByPk(VillageId)
        const newBalance = +balance + +amount

        await Village.update({ balance: newBalance }, { where: { id: VillageId }})

        const dataCreate = await Transaction.create({ title, amount, category, note, type, VillageId, UserId: id })
        res.status(201).json(dataCreate)
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = TransactionController
