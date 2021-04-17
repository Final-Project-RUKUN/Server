const { Suggestion, Village, User } = require('../models')
class SuggestionConroller {
  static async fetchSuggestions(req, res, next){
    try {
      const { VillageId } = req.currentUser
      const villageSuggestions = await Village.findByPk(VillageId, 
        { include: [{
          model:  Suggestion,
          include: User
      }]})
     
      res.status(200).json(villageSuggestions)
    } catch (error) {
      next(error)
    }
  }

  static async getSuggestion(req, res, next){
    const { id } = req.params

    try {
      const suggestion = await Suggestion.findByPk(id)

      res.status(200).json(suggestion)
    } catch (error) {
      next(error)
    }

  }
  static async addSuggestion(req, res, next){
    const { title, description } = req.body
    const { id, VillageId } = req.currentUser

    try {
      const dataUpdate = await Suggestion.create({title, description, UserId: id, VillageId})
      
      res.status(200).json(dataUpdate)
    } catch (error) {
      next(error)
    }
  }
  static async updateSuggestion(req, res, next){
    const { title, description } = req.body
    const { id, VillageId } = req.currentUser
    const{ id : idSggstn } = req.prams

    try {
      
      const dataUpdate = await Suggestion.update({title, description, UserId: id, VillageId},{ where: { id: idSggstn } })
      
      res.status(200).json(dataUpdate)
    } catch (error) {
      next(error)
    }
  }
  static async deleteSuggestion(req, res, next){
    const { id } = req.params

    try {
      await Suggestion.destroy({ where: id })

      res.status(200).json({ message: 'Suggestion has been successfully deleted.'})
    } catch (error) {
      next(error)
    }
  }
}

module.exports = SuggestionConroller
