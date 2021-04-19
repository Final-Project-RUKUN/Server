const { Suggestion, Village, User } = require('../models')
class SuggestionConroller {
  static async fetchSuggestions(req, res, next){
    try {
      const { VillageId } = req.currentUser
      const villageSuggestions = await Village.findByPk(VillageId, 
        { include: [{
          model:  Suggestion,
          order: [['id', 'ASC']],
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
      if (suggestion) {
        res.status(200).json(suggestion)
      } else {
        next({
          code: 404,
          message: 'Suggeston Not Found'
        })
      }
    } catch (error) {
      next(error)
    }

  }
  static async addSuggestion(req, res, next){
    const { title, description } = req.body
    const { id, VillageId } = req.currentUser

    try {
      const suggestion = await Suggestion.create({title, description, UserId: id, VillageId})
      
      res.status(201).json(suggestion)
    } catch (error) {
      next(error)
    }
  }
  static async updateSuggestion(req, res, next){
    const { title, description } = req.body
    const { id, VillageId } = req.currentUser
    const{ id : idSuggestion } = req.params

    try {
      await Suggestion.update({title, description, UserId: id, VillageId},{ where: { id: idSuggestion } })

      res.status(200).json({ message: 'Successfully updated suggestion.'})
    } catch (error) {
      next(error)
    }
  }
  static async deleteSuggestion(req, res, next){
    const { id } = req.params

    try {
      console.log('jalannnn');
      await Suggestion.destroy({ where : { id }, returning : true })

      res.status(200).json({ message: 'Suggestion has been successfully deleted.'})
    } catch (error) {
      next(error)
    }
  }
}

module.exports = SuggestionConroller
