const { User } = require('../models/')

class UserController {

  static async login(req, res, next) {
    const { id } = req.params
    
    try {
      const data = await User.findByPk(id)
      
      res.send(data)
    } catch (error) {
      console.log(error);
    }
  }

  static register(req, res, next) {
    const { user, username, password, role } = req.body
   
  }

}

module.exports = UserController
