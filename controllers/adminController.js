const { User, Village } = require('../models')
const { comparePassword } = require('../helpers/useBcrypt')
const { generateToken } = require('../helpers/useJwt')
const createToken = require('../helpers/useToken')


class AdminController {

  static async registerAdmin(req, res, next) {
    const { name, username, password, nameVillage, location, balance } = req.body
    console.log(req.body);
    try {
        const invitation_code = createToken()
        const user = await User.create({ name, username, password, role: 'admin' })
        
        const village = await Village.create({ name: nameVillage, location, invitation_code, balance, UserId: user.id})

        await User.update({ VillageId: village.id } ,{ where: { id: user.id }})

        res.status(201).json({ message: 'Successfully Created User and Village', invitation_code})
    } catch (error) {
      next(error)
    }
  }

  static async loginAdmin(req, res, next) {
    console.log(req.body, 'login admin');
    const { username, password, role } = req.body
    try {
        const user = await User.findOne({ where: { username }})
        
        if (user) {
          const isPassword = comparePassword( password, user.password )
          console.log(isPassword, ' cek isPassword');
          
          if (isPassword && role === 'admin') {
            console.log('masuk if ok');
            const access_token = generateToken({ id: user.id, username: user.username })
            
            res.status(200).json(access_token)
          } else {
            console.log('masuk error');
            next({ code: 404, message: "Invalid Username/Password" })
          }
        } else {
          next({ code: 404, message: "Invalid Username/Password" })
        }
      } catch (error) {
        next(error)
      }
    }

  static async changeAdmin(req, res, next) {
    const { id } = req.params
    const { VillageId, id : AdminId } = req.currentUser

    try {
      await Village.update({ UserId: id }, { where: { id: VillageId }})

      await User.update({ role: 'admin' }, { where: { id }})

      await User.update({ role: 'member' }, { where: { id: AdminId }})
      
      res.status(200).json({ message: "Successfully change role admin" })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = AdminController
